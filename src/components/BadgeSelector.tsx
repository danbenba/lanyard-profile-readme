"use client";

import React, { useState } from "react";
import { Badges } from "@/utils/badges";
import { cn } from "@/utils/helpers";
import * as Icon from "lucide-react";

// Liste complète de tous les badges Discord disponibles
export const ALL_DISCORD_BADGES = [
  // General Badges
  { key: "Discord_Employee", name: "Discord Staff", category: "General" },
  { key: "Partnered_Server_Owner", name: "Partnered Server Owner", category: "General" },
  { key: "HypeSquad_Events", name: "HypeSquad Events", category: "General" },
  { key: "House_Brilliance", name: "HypeSquad Brilliance", category: "General" },
  { key: "House_Bravery", name: "HypeSquad Bravery", category: "General" },
  { key: "House_Balance", name: "HypeSquad Balance", category: "General" },
  { key: "Bug_Hunter_Level_1", name: "Discord Bug Hunter (Tier 1)", category: "General" },
  { key: "Bug_Hunter_Level_2", name: "Discord Bug Hunter (Tier 2)", category: "General" },
  { key: "Early_Verified_Bot_Developer", name: "Early Verified Bot Developer", category: "General" },
  { key: "Active_Developer", name: "Active Developer", category: "General" },
  { key: "Nitro", name: "Discord Nitro", category: "General" },
  { key: "Early_Supporter", name: "Early Supporter", category: "General" },
  { key: "Discord_Certified_Moderator", name: "Moderator Programs Alumni", category: "General" },
];

interface BadgeSelectorProps {
  selectedBadges: string[];
  onBadgesChange: (badges: string[]) => void;
}

export const BadgeSelector: React.FC<BadgeSelectorProps> = ({
  selectedBadges,
  onBadgesChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(ALL_DISCORD_BADGES.map((badge) => badge.category))
  );

  const availableBadges = ALL_DISCORD_BADGES.filter((badge) => {
    const matchesSearch =
      badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      badge.key.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === null || badge.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBadge = (badgeKey: string) => {
    if (selectedBadges.includes(badgeKey)) {
      onBadgesChange(selectedBadges.filter((b) => b !== badgeKey));
    } else {
      onBadgesChange([...selectedBadges, badgeKey]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-300">
          Rechercher un badge
        </label>
        <div className="relative">
          <Icon.Search
            size={16}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-transparent px-8 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:border-white/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "rounded-md px-3 py-1 text-xs font-medium transition-colors",
            selectedCategory === null
              ? "bg-white/20 text-white"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          )}
        >
          Tous
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium transition-colors",
              selectedCategory === category
                ? "bg-white/20 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="max-h-64 overflow-y-auto rounded-lg border border-white/10 bg-zinc-900/50 p-3">
        {availableBadges.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            Aucun badge trouvé
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {availableBadges.map((badge) => {
              const isSelected = selectedBadges.includes(badge.key);
              const badgeImage = Badges[badge.key as keyof typeof Badges];

              return (
                <button
                  key={badge.key}
                  onClick={() => toggleBadge(badge.key)}
                  className={cn(
                    "relative flex flex-col items-center gap-2 rounded-md border p-2 transition-all",
                    isSelected
                      ? "border-white/50 bg-white/10"
                      : "border-white/10 bg-transparent hover:border-white/30 hover:bg-white/5"
                  )}
                  title={badge.name}
                >
                  {badgeImage ? (
                    <img
                      src={`data:image/png;base64,${badgeImage}`}
                      alt={badge.name}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-700 text-xs text-gray-400">
                      ?
                    </div>
                  )}
                  <span className="text-[10px] text-center text-gray-300">
                    {badge.name}
                  </span>
                  {isSelected && (
                    <div className="absolute right-1 top-1 rounded-full bg-green-500 p-0.5">
                      <Icon.Check
                        size={10}
                        className="text-white"
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedBadges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <p className="w-full text-xs text-gray-400">
            Badges sélectionnés ({selectedBadges.length}):
          </p>
          {selectedBadges.map((badgeKey) => {
            const badge = ALL_DISCORD_BADGES.find((b) => b.key === badgeKey);
            if (!badge) return null;
            const badgeImage = Badges[badgeKey as keyof typeof Badges];

            return (
              <div
                key={badgeKey}
                className="group relative flex items-center gap-1 rounded-md border border-white/20 bg-white/5 px-2 py-1"
              >
                {badgeImage && (
                  <img
                    src={`data:image/png;base64,${badgeImage}`}
                    alt={badge.name}
                    className="h-4 w-4 object-contain"
                  />
                )}
                <span className="text-xs text-gray-300">{badge.name}</span>
                <button
                  onClick={() => toggleBadge(badgeKey)}
                  className="ml-1 text-gray-400 hover:text-white"
                >
                  <Icon.X size={12} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

