import React from "react";
import ProfileCard from "@/components/ProfileCard";
import ErrorCard from "@/components/ErrorCard";
import { isSnowflake } from "@/utils/snowflake";
import { Root } from "@/utils/LanyardTypes";
import { extractSearchParams } from "@/utils/extractSearchParams";
import { fetchUserImages } from "@/utils/fetchUserImages";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ReactDOMServer = (await import("react-dom/server")).default;
  const { searchParams } = new URL(request.url);
  const { id: userId } = await params;

  if (!userId)
    return Response.json(
      {
        data: {
          error: "No user ID provided.",
        },
        success: false,
      },
      {
        status: 400,
      }
    );

  if (!isSnowflake(userId))
    return Response.json(
      {
        data: {
          error: "The user ID you provided is not a valid snowflake.",
        },
        success: false,
      },
      {
        status: 400,
      }
    );

  const lanyardData = await fetch(
    `https://api.lanyard.rest/v1/users/${userId}`,
    {
      cache: "no-store",
    }
  ).then(async (res) => {
    const data = await res.json();
    return data as Root & { error?: { code?: string; message?: string } };
  });

  // Si erreur "user_not_monitored", afficher une carte d'erreur avec badges personnalisés
  if (!lanyardData.success && lanyardData.error?.code === "user_not_monitored") {
    const settings = await extractSearchParams(
      Object.fromEntries(searchParams.entries()),
      null as any // On passe null car on n'a pas de données
    );

    // Générer un SVG d'erreur avec les badges personnalisés
    try {
      const errorMessage = lanyardData.error?.message || "L'utilisateur n'est pas surveillé par Lanyard";
      const svgString = ReactDOMServer.renderToStaticMarkup(
        React.createElement(ErrorCard, {
          settings: settings,
          errorMessage: errorMessage,
          userId: userId,
        })
      );

      return new Response(svgString, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=60, s-maxage=60",
        },
      });
    } catch (error) {
      console.error("Error generating error SVG:", error);
    }
  }

  if (!lanyardData.success) {
    const errorMsg = typeof lanyardData.error === "object" 
      ? (lanyardData.error?.message || "Unknown error")
      : (lanyardData.error || "Unknown error");
    
    return Response.json(
      {
        data: errorMsg,
        success: false,
      },
      {
        status: 400,
      }
    );
  }

  const settings = await extractSearchParams(
    Object.fromEntries(searchParams.entries()),
    lanyardData.data
  );

  // Generate SVG
  try {
    const images = await fetchUserImages(lanyardData.data, settings);

    // Render React SVG component to string
    const svgString = ReactDOMServer.renderToStaticMarkup(
      await ProfileCard({
        data: lanyardData.data,
        settings: settings,
        images: images,
      })
    );

    // Return SVG with appropriate headers
    return new Response(svgString, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=60, s-maxage=60",
      },
    });
  } catch (error) {
    console.error("Error generating SVG:", error);
    return new Response("Error generating SVG", { status: 500 });
  }
}
