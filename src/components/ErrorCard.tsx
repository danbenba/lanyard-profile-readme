import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { ProfileSettings } from "@/utils/parameters";
import { Badges } from "@/utils/badges";
import { getBadgeImage } from "@/utils/badgeImages";

interface ErrorCardProps {
  settings: ProfileSettings;
  errorMessage: string;
  userId: string;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({
  settings,
  errorMessage,
  userId,
}) => {
  const {
    theme = "dark",
    bg,
    borderRadius = "10px",
  } = settings;

  const backgroundColor: string =
    bg ?? (theme === "light" ? "ededed" : "1a1c1f");

  const width = "410px";
  const height = "130px";

  const ForeignDiv = (
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLDivElement> & { xmlns: string },
      HTMLDivElement
    >
  ) => <div {...props}>{props.children}</div>;

  // Récupérer les badges personnalisés si disponibles
  let flags: string[] = [];
  if (settings.customBadges && settings.customBadges.length > 0) {
    flags = settings.customBadges.filter((v) => getBadgeImage(v));
  }
  
  const clanBackgroundColor: string =
    theme === "light" ? "#e0dede" : "#111214";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <foreignObject x="0" y="0" width="410" height={height}>
        <ForeignDiv
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            position: "absolute",
            width: "400px",
            height: "120px",
            inset: 0,
            backgroundColor: `#${backgroundColor}`,
            color: theme === "dark" ? "#fff" : "#000",
            fontFamily: `'Century Gothic', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
            fontSize: "16px",
            display: "flex",
            flexDirection: "column",
            padding: "5px",
            borderRadius: borderRadius,
          }}
        >
          <div
            style={{
              width: "400px",
              height: "100px",
              inset: 0,
              display: "flex",
              flexDirection: "row",
              paddingBottom: "5px",
              borderBottom: `solid 0.5px ${
                theme === "dark"
                  ? "hsl(0, 0%, 100%, 10%)"
                  : "hsl(0, 0%, 0%, 10%)"
              }`,
            }}
          >

            <div
              style={{
                height: "80px",
                width: "340px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "25px",
                  alignItems: "center",
                }}
              >
                <h1
                  style={{
                    fontSize: "1.15rem",
                    margin: "0 12px 0 0",
                    whiteSpace: "nowrap",
                  }}
                >
                  Utilisateur non surveillé
                </h1>

                {flags.length > 0 &&
                  flags.map((v) => {
                    const badgeImage = getBadgeImage(v);
                    return badgeImage ? (
                      <img
                        key={v}
                        alt={v}
                        src={badgeImage}
                        style={{
                          width: "auto",
                          height: "20px",
                        position: "relative",
                        top: "50%",
                        transform: "translate(0%, -50%)",
                          marginRight: "7px",
                        }}
                      />
                    ) : null;
                  })
                  .filter(Boolean)}
              </div>

              <p
                style={{
                  fontSize: "0.9rem",
                  margin: "4px 0 0 0",
                  color: theme === "dark" ? "#aaa" : "#333",
                  fontWeight: 400,
                  overflow: "hidden",
                  whiteSpace: "normal",
                  textOverflow: "ellipsis",
                  lineHeight: "1.3",
                }}
              >
                {errorMessage}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "30px",
              marginLeft: "15px",
              fontSize: "0.75rem",
              paddingTop: "8px",
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: theme === "dark" ? "#aaa" : "#666",
                margin: 0,
                fontSize: "0.8rem",
              }}
            >
              Rejoignez le{" "}
              <a
                href="https://discord.gg/lanyard"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: theme === "dark" ? "#5865F2" : "#5865F2",
                  textDecoration: "underline",
                }}
              >
                serveur Discord Lanyard
              </a>{" "}
              pour activer la surveillance
            </p>
          </div>
        </ForeignDiv>
      </foreignObject>
    </svg>
  );
};

export default ErrorCard;

