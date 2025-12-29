"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { getBadgeInfo } from "@/utils/badgeInfo";
import * as Icon from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const NITRO_BADGE_PNG: Record<string, string> = {
  Nitro_Bronze: "/assets/subscriptions/badges/bronze.png",
  Nitro_Silver: "/assets/subscriptions/badges/silver.png",
  Nitro_Gold: "/assets/subscriptions/badges/gold.png",
  Nitro_Platinum: "/assets/subscriptions/badges/platinum.png",
  Nitro_Diamond: "/assets/subscriptions/badges/diamond.png",
  Nitro_Emerald: "/assets/subscriptions/badges/emerald.png",
  Nitro_Ruby: "/assets/subscriptions/badges/ruby.png",
  Nitro_Opal: "/assets/subscriptions/badges/opal.png",
};

const NITRO_BADGE_SVG: Record<string, string> = {
  Nitro_Bronze: "/assets/subscriptions/bronze.svg",
  Nitro_Silver: "/assets/subscriptions/silver.svg",
  Nitro_Gold: "/assets/subscriptions/gold.svg",
  Nitro_Platinum: "/assets/subscriptions/platinum.svg",
  Nitro_Diamond: "/assets/subscriptions/diamond.svg",
  Nitro_Emerald: "/assets/subscriptions/emerald.svg",
  Nitro_Ruby: "/assets/subscriptions/ruby.svg",
  Nitro_Opal: "/assets/subscriptions/opal.svg",
};

const BOOST_BADGE_URLS: Record<string, string> = {
  Boost_1_Month: "/assets/boosts/discordboost1.svg",
  Boost_2_Months: "/assets/boosts/discordboost2.svg",
  Boost_3_Months: "/assets/boosts/discordboost3.svg",
  Boost_6_Months: "/assets/boosts/discordboost4.svg",
  Boost_9_Months: "/assets/boosts/discordboost5.svg",
  Boost_1_Year: "/assets/boosts/discordboost6.svg",
  Boost_1_Year_3_Months: "/assets/boosts/discordboost7.svg",
  Boost_1_Year_6_Months: "/assets/boosts/discordboost8.svg",
  Boost_2_Years: "/assets/boosts/discordboost9.svg",
};

export const ALL_DISCORD_BADGES = [
  { key: "Discord_Employee", name: "Discord Staff", category: "General" },
  { key: "Partnered_Server_Owner", name: "Partnered Server Owner", category: "General" },
  { key: "HypeSquad_Events", name: "HypeSquad Events", category: "General" },
  { key: "Early_Verified_Bot_Developer", name: "Early Verified Bot Developer", category: "General" },
  { key: "Active_Developer", name: "Active Developer", category: "General" },
  { key: "Early_Supporter", name: "Early Supporter", category: "General" },
  { key: "Discord_Certified_Moderator", name: "Moderator Programs Alumni", category: "General" },
  { key: "Orbs_Apprentice", name: "Orbs Apprentice", category: "General" },
  { key: "Quest_Completed", name: "Completed a Quest", category: "General" },
  { key: "Discord_Lootbox", name: "A clown, for a limited time", category: "General" },
  { key: "Original_Username", name: "Originally known as", category: "General" },
  { key: "Supports_Commands", name: "Supports Commands", category: "Bot" },
  { key: "Uses_Automod", name: "Uses Automod", category: "Bot" },
  { key: "Premium_Bot", name: "This server has _App Name_ premium", category: "Bot" },
  { key: "House_Balance", name: "HypeSquad Balance", category: "HypeSquad", variant: "Balance" },
  { key: "House_Bravery", name: "HypeSquad Bravery", category: "HypeSquad", variant: "Bravery" },
  { key: "House_Brilliance", name: "HypeSquad Brilliance", category: "HypeSquad", variant: "Brilliance" },
  { key: "Bug_Hunter_Level_1", name: "Bug Hunter Tier 1", category: "Bug Hunter", variant: "Tier 1" },
  { key: "Bug_Hunter_Level_2", name: "Bug Hunter Tier 2", category: "Bug Hunter", variant: "Tier 2" },
  { key: "Nitro", name: "Discord Nitro", category: "Nitro", variant: "Base" },
  { key: "Nitro_Bronze", name: "Nitro Bronze (1 mois)", category: "Nitro", variant: "1 mois" },
  { key: "Nitro_Silver", name: "Nitro Silver (3 mois)", category: "Nitro", variant: "3 mois" },
  { key: "Nitro_Gold", name: "Nitro Gold (6 mois)", category: "Nitro", variant: "6 mois" },
  { key: "Nitro_Platinum", name: "Nitro Platinum (12 mois)", category: "Nitro", variant: "12 mois" },
  { key: "Nitro_Diamond", name: "Nitro Diamond (24 mois)", category: "Nitro", variant: "24 mois" },
  { key: "Nitro_Emerald", name: "Nitro Emerald (36 mois)", category: "Nitro", variant: "36 mois" },
  { key: "Nitro_Ruby", name: "Nitro Ruby (60 mois)", category: "Nitro", variant: "60 mois" },
  { key: "Nitro_Opal", name: "Nitro Opal (72+ mois)", category: "Nitro", variant: "72+ mois" },
  { key: "Boost_1_Month", name: "Server boosting (1 Month)", category: "Boost", variant: "1 Month" },
  { key: "Boost_2_Months", name: "Server boosting (2 Months)", category: "Boost", variant: "2 Months" },
  { key: "Boost_3_Months", name: "Server boosting (3 Months)", category: "Boost", variant: "3 Months" },
  { key: "Boost_6_Months", name: "Server boosting (6 Months)", category: "Boost", variant: "6 Months" },
  { key: "Boost_9_Months", name: "Server boosting (9 Months)", category: "Boost", variant: "9 Months" },
  { key: "Boost_1_Year", name: "Server boosting (1 Year)", category: "Boost", variant: "1 Year" },
  { key: "Boost_1_Year_3_Months", name: "Server boosting (1 Year & 3 Months)", category: "Boost", variant: "1 Year & 3 Months" },
  { key: "Boost_1_Year_6_Months", name: "Server boosting (1 Year & 6 Months)", category: "Boost", variant: "1 Year & 6 Months" },
  { key: "Boost_2_Years", name: "Server boosting (2 Years)", category: "Boost", variant: "2 Years" },
];

interface BadgeSelectorProps {
  selectedBadges: string[];
  onBadgesChange: (badges: string[]) => void;
  autoDetectedBadges?: string[];
}

const ALL_BADGE_ASSETS: Record<string, string> = {
  Discord_Employee: "/assets/discordstaff.svg",
  Partnered_Server_Owner: "/assets/discordpartner.svg",
  HypeSquad_Events: "/assets/hypesquadevents.svg",
  House_Brilliance: "/assets/hypesquadbrilliance.svg",
  House_Bravery: "/assets/hypesquadbravery.svg",
  House_Balance: "/assets/hypesquadbalance.svg",
  Early_Verified_Bot_Developer: "/assets/discordbotdev.svg",
  Active_Developer: "/assets/activedeveloper.svg",
  Early_Supporter: "/assets/discordearlysupporter.svg",
  Discord_Certified_Moderator: "/assets/discordmod.svg",
  Nitro: "/assets/discordnitro.svg",
  Bug_Hunter_Level_1: "/assets/discordbughunter1.svg",
  Bug_Hunter_Level_2: "/assets/discordbughunter2.svg",
  Orbs_Apprentice: "/assets/orb.svg",
  Quest_Completed: "/assets/quest.png",
  Discord_Lootbox: "/assets/special/discordlootbox.svg",
  Original_Username: "/assets/username.png",
  Supports_Commands: "/assets/supportscommands.svg",
  Uses_Automod: "/assets/automod.svg",
  Premium_Bot: "/assets/premiumbot.png",
  ...NITRO_BADGE_PNG,
  ...BOOST_BADGE_URLS,
};

export const getBadgeImage = (badgeKey: string): string | undefined => {
  return ALL_BADGE_ASSETS[badgeKey];
};

export const getBadgeTooltipImage = (badgeKey: string): string | undefined => {
  if (NITRO_BADGE_SVG[badgeKey]) {
    return NITRO_BADGE_SVG[badgeKey];
  }
  return ALL_BADGE_ASSETS[badgeKey];
};



export const BadgeSelector: React.FC<BadgeSelectorProps> = ({
  selectedBadges,
  onBadgesChange,
  autoDetectedBadges = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(ALL_DISCORD_BADGES.map((badge) => badge.category))
  );

  const availableBadges = ALL_DISCORD_BADGES.filter((badge) => {
    if (autoDetectedBadges.includes(badge.key)) {
      return false;
    }
    const matchesSearch =
      badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      badge.key.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === null || badge.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const EXCLUSIVE_CATEGORIES = ["HypeSquad", "Bug Hunter", "Nitro", "Boost"];

  const toggleBadge = (badgeKey: string) => {
    const badge = ALL_DISCORD_BADGES.find((b) => b.key === badgeKey);
    if (!badge) return;

    let filtered = selectedBadges;

    if (EXCLUSIVE_CATEGORIES.includes(badge.category)) {
      filtered = selectedBadges.filter((b) => {
        const otherBadge = ALL_DISCORD_BADGES.find((badge) => badge.key === b);
        return !otherBadge || otherBadge.category !== badge.category;
      });
    }

    if (filtered.includes(badgeKey)) {
      onBadgesChange(filtered.filter((b) => b !== badgeKey));
    } else {
      onBadgesChange([...filtered, badgeKey]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Rechercher un badge
        </Label>
        <div className="relative">
          <Icon.Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Rechercher par nom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "secondary" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className="text-xs h-7"
        >
          Tous
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "secondary" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="text-xs h-7"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="max-h-64 overflow-y-auto overflow-x-hidden rounded-lg border border-white/10 bg-zinc-900/50 p-3 relative">
        {availableBadges.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            Aucun badge trouvé
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {availableBadges.map((badge) => {
              const isSelected = selectedBadges.includes(badge.key);

              const badgeImage = getBadgeImage(badge.key);
              const displayName = badge.variant ? `${badge.name.split(" ")[0]} ${badge.variant}` : badge.name;

              const badgeInfo = getBadgeInfo(badge.key);
              const tooltipText = badgeInfo.description
                ? `${badgeInfo.description}\n${badgeInfo.earnedBy ? `Obtenu en: ${badgeInfo.earnedBy}` : ""}`
                : displayName;

              return (
                <div key={badge.key} className="group relative">
                  <button
                    onClick={() => toggleBadge(badge.key)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 rounded-md border p-2 transition-all w-full",
                      isSelected
                        ? "border-white/50 bg-white/10"
                        : "border-white/10 bg-transparent hover:border-white/30 hover:bg-white/5"
                    )}
                  >
                    {badgeImage ? (
                      <img
                        src={badgeImage}
                        alt={badge.name}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-700 text-xs text-gray-400">
                        ?
                      </div>
                    )}
                    <span className="text-[10px] text-center text-gray-300">
                      {displayName}
                      {badge.variant && (
                        <span className="block text-[9px] text-gray-500 mt-0.5">
                          {badge.variant}
                        </span>
                      )}
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
                  {/* Tooltip - Uniquement dans la grille de sélection */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 hidden group-hover:block pointer-events-auto">
                    <div className="max-w-xs rounded bg-zinc-900 p-2 text-xs text-gray-200 shadow-lg border border-white/10">
                      {tooltipText.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};