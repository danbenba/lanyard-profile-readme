import React from "react";
import ProfileCard from "@/components/ProfileCard";
import ErrorCard from "@/components/ErrorCard";
import { isSnowflake } from "@/utils/snowflake";
import { Root } from "@/utils/LanyardTypes";
import { extractSearchParams } from "@/utils/extractSearchParams";
import { fetchUserImages } from "@/utils/fetchUserImages";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

function cleanSvgFromPreloadTags(content: string): string {
  let cleaned = content.trim();
  const preloadPattern = /<link[^>]*rel=["']preload["'][^>]*>/gi;
  cleaned = cleaned.replace(preloadPattern, "");
  
  if (!cleaned.startsWith("<svg")) {
    const svgIndex = cleaned.indexOf("<svg");
    if (svgIndex > 0) {
      cleaned = cleaned.substring(svgIndex);
    }
  }
  
  return cleaned.trim();
}

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

  if (!lanyardData.success && lanyardData.error?.code === "user_not_monitored") {
    const settings = await extractSearchParams(
      Object.fromEntries(searchParams.entries()),
      null as any
    );

    try {
      const errorMessage = lanyardData.error?.message || "L'utilisateur n'est pas surveillé par Lanyard";
      let svgString = ReactDOMServer.renderToStaticMarkup(
        React.createElement(ErrorCard, {
          settings: settings,
          errorMessage: errorMessage,
          userId: userId,
        })
      );

      svgString = cleanSvgFromPreloadTags(svgString);

      const encoder = new TextEncoder();
      const svgBuffer = encoder.encode(svgString);

      return new Response(svgBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
          "Content-Length": svgBuffer.length.toString(),
          "Cache-Control": "public, max-age=60, s-maxage=60",
          "X-Content-Type-Options": "nosniff",
           "X-Frame-Options": "SAMEORIGIN",
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

  try {
    const images = await fetchUserImages(lanyardData.data, settings);

    let svgString = ReactDOMServer.renderToStaticMarkup(
      await ProfileCard({
        data: lanyardData.data,
        settings: settings,
        images: images,
      })
    );

    svgString = cleanSvgFromPreloadTags(svgString);

    const encoder = new TextEncoder();
    const svgBuffer = encoder.encode(svgString);

    return new Response(svgBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Content-Length": svgBuffer.length.toString(),
        "Cache-Control": "public, max-age=60, s-maxage=60",
        "X-Content-Type-Options": "nosniff",
         "X-Frame-Options": "SAMEORIGIN",
      },
    });
  } catch (error) {
    console.error("Error generating SVG:", error);
    return new Response("Error generating SVG", { status: 500 });
  }
}
