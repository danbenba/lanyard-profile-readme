"use client";

import React, { useState, useRef, useEffect } from "react";
import { getBadgeTooltipImage, getBadgeInfo } from "./BadgeSelector";

interface ProfilePreviewProps {
  imageUrl: string;
  selectedBadges: string[];
  userId: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const ProfilePreview: React.FC<ProfilePreviewProps> = ({
  imageUrl,
  selectedBadges,
  userId,
  onLoad,
  onError,
}) => {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pour l'aperçu, utiliser directement l'URL de l'API dans l'iframe
    // afin que les ressources relatives (/assets/...) se résolvent correctement.
    if (!imageUrl) return;
    setSvgContent("loaded");
  }, [imageUrl, onLoad, onError]);

  // Position approximative des badges dans le profil (basé sur la structure Discord)
  // Les badges commencent après le nom d'utilisateur, environ à 80px de la gauche
  const badgeStartX = 80;
  const badgeY = 25; // Hauteur approximative où se trouvent les badges

  const handleBadgeHover = (badge: string, index: number, event: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Position X du badge (80px de base + 25px par badge)
    const badgeX = badgeStartX + index * 25;
    
    setHoveredBadge(badge);
    setTooltipPosition({
      x: badgeX,
      y: badgeY,
    });
  };

  const handleBadgeLeave = () => {
    setHoveredBadge(null);
    setTooltipPosition(null);
  };

  if (!imageUrl) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <iframe
        src={imageUrl}
        className="border-0 w-full"
        style={{ height: "210px" }}
        onLoad={onLoad}
        onError={onError}
        title="Profile Preview"
      />
      
      {/* Zones cliquables pour les tooltips des badges */}
      {selectedBadges.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {selectedBadges.map((badge, index) => {
            const badgeInfo = getBadgeInfo(badge);
            if (!badgeInfo.description) return null;

            return (
              <div
                key={badge}
                className="pointer-events-auto"
                style={{
                  position: "absolute",
                  left: `${badgeStartX + index * 25}px`,
                  top: `${badgeY}px`,
                  width: "20px",
                  height: "20px",
                  cursor: "help",
                }}
                onMouseEnter={(e) => handleBadgeHover(badge, index, e)}
                onMouseLeave={handleBadgeLeave}
              />
            );
          })}
        </div>
      )}

      {/* Tooltip */}
      {hoveredBadge && tooltipPosition && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translate(-50%, calc(-100% - 8px))",
          }}
        >
          <div
            style={{
              padding: "8px 12px",
              backgroundColor: "rgba(32, 34, 37, 0.95)",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "14px",
              fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
              whiteSpace: "nowrap",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {(() => {
              const tooltipImage = getBadgeTooltipImage(hoveredBadge);
              const isNitro = hoveredBadge.startsWith("Nitro_");
              const isBoost = hoveredBadge.startsWith("Boost_");
              const badgeInfo = getBadgeInfo(hoveredBadge);
              
              return (
                <>
                  {tooltipImage && (isNitro || isBoost) && (
                    <img
                      src={tooltipImage}
                      alt={hoveredBadge}
                      style={{
                        width: isNitro ? "24px" : "20px",
                        height: isNitro ? "24px" : "20px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: "2px" }}>
                      {badgeInfo.description}
                    </div>
                    {badgeInfo.earnedBy && (
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#b9bbbe",
                          fontWeight: 400,
                        }}
                      >
                        {badgeInfo.earnedBy}
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid rgba(32, 34, 37, 0.95)",
            }}
          />
        </div>
      )}
    </div>
  );
};

