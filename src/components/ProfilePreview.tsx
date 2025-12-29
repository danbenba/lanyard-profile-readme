"use client";

import React from "react";
import { getBadgeTooltipImage } from "@/utils/badgeImages";
import { getBadgeInfo } from "@/utils/badgeInfo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

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
  // Position approximative des badges dans le profil
  const badgeStartX = 80;
  const badgeY = 25;

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="relative inline-block w-full">
      <iframe
        src={imageUrl}
        className="border-0 w-full"
        style={{ height: "210px" }}
        onLoad={onLoad}
        onError={onError}
        title="Profile Preview"
      />

      {/* Tooltips pour les badges */}
      {selectedBadges.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {selectedBadges.map((badge, index) => {
            const badgeInfo = getBadgeInfo(badge);
            const tooltipImage = getBadgeTooltipImage(badge);
            const isNitro = badge.startsWith("Nitro_");
            const isBoost = badge.startsWith("Boost_");

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
                }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-full h-full cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-zinc-950 border border-zinc-800 text-white p-3 shadow-xl">
                      <div className="flex items-center gap-3">
                        {tooltipImage && (isNitro || isBoost) && (
                          <img
                            src={tooltipImage}
                            alt={badge}
                            className={isNitro ? "w-6 h-6" : "w-5 h-5"}
                            style={{ objectFit: "contain" }}
                          />
                        )}
                        <div>
                          <div className="font-semibold text-sm">
                            {badgeInfo.description || badge}
                          </div>
                          {badgeInfo.earnedBy && (
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {badgeInfo.earnedBy}
                            </div>
                          )}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
