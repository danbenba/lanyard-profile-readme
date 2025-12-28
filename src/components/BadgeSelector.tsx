"use client";

import React, { useState } from "react";
import { cn } from "@/utils/helpers";
import * as Icon from "lucide-react";

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

const BADGE_INFO: Record<string, { description: string; earnedBy: string }> = {
  Discord_Employee: {
    description: "Discord Staff",
    earnedBy: "Being an employee member at Discord",
  },
  Partnered_Server_Owner: {
    description: "Partnered Server Owner",
    earnedBy: "Owning a partnered server before October 5th, 2023",
  },
  HypeSquad_Events: {
    description: "HypeSquad Events",
    earnedBy: "User had to attend/represent Discord on events (Closed)",
  },
  House_Balance: {
    description: "HypeSquad Balance",
    earnedBy: "Taking the HypeSquad Test (Removed)",
  },
  House_Bravery: {
    description: "HypeSquad Bravery",
    earnedBy: "Taking the HypeSquad Test (Removed)",
  },
  House_Brilliance: {
    description: "HypeSquad Brilliance",
    earnedBy: "Taking the HypeSquad Test (Removed)",
  },
  Bug_Hunter_Level_1: {
    description: "Discord Bug Hunter (Tier 1)",
    earnedBy: "Awarded to the most hard-working of those in the Bug Hunter community",
  },
  Bug_Hunter_Level_2: {
    description: "Discord Bug Hunter (Tier 2)",
    earnedBy: "Reach the highest hunter level by going above and beyond",
  },
  Early_Verified_Bot_Developer: {
    description: "Early Verified Bot Developer",
    earnedBy: "Owning a verified Discord bot before August 19, 2020",
  },
  Active_Developer: {
    description: "Active Developer",
    earnedBy: "Own at least 1 active application that executed a Global Command in the last 30 days",
  },
  Early_Supporter: {
    description: "Early Supporter",
    earnedBy: "Had a successful transaction on Discord before October 10th, 2018",
  },
  Discord_Certified_Moderator: {
    description: "Moderator Programs Alumni",
    earnedBy: "Can no longer be obtained after December 1st 2022",
  },
  Nitro: {
    description: "Discord Nitro",
    earnedBy: "Having a valid Discord Nitro, Nitro Basic, or Nitro Classic subscription",
  },
  Nitro_Bronze: {
    description: "Nitro depuis 1 mois",
    earnedBy: "Subscribing to Nitro for 1 month",
  },
  Nitro_Silver: {
    description: "Nitro depuis 3 mois",
    earnedBy: "Subscribing to Nitro for 3 months",
  },
  Nitro_Gold: {
    description: "Nitro depuis 6 mois",
    earnedBy: "Subscribing to Nitro for 6 months",
  },
  Nitro_Platinum: {
    description: "Nitro depuis 1 an",
    earnedBy: "Subscribing to Nitro for 12 months (1 year)",
  },
  Nitro_Diamond: {
    description: "Nitro depuis 2 ans",
    earnedBy: "Subscribing to Nitro for 24 months (2 years)",
  },
  Nitro_Emerald: {
    description: "Nitro depuis 3 ans",
    earnedBy: "Subscribing to Nitro for 36 months (3 years)",
  },
  Nitro_Ruby: {
    description: "Nitro depuis 5 ans",
    earnedBy: "Subscribing to Nitro for 60 months (5 years)",
  },
  Nitro_Opal: {
    description: "Nitro depuis 6+ ans",
    earnedBy: "Subscribing to Nitro for 72+ months (6+ years)",
  },
  Boost_1_Month: {
    description: "Boost depuis 1 mois",
    earnedBy: "Boosting a Discord server",
  },
  Boost_2_Months: {
    description: "Boost depuis 2 mois",
    earnedBy: "Boosting a Discord server for 2 months straight",
  },
  Boost_3_Months: {
    description: "Boost depuis 3 mois",
    earnedBy: "Boosting a Discord server for 3 months straight",
  },
  Boost_6_Months: {
    description: "Boost depuis 6 mois",
    earnedBy: "Boosting a Discord server for 6 months straight",
  },
  Boost_9_Months: {
    description: "Boost depuis 9 mois",
    earnedBy: "Boosting a Discord server for 9 months straight",
  },
  Boost_1_Year: {
    description: "Boost depuis 1 an",
    earnedBy: "Boosting a Discord server for 1 year straight",
  },
  Boost_1_Year_3_Months: {
    description: "Boost depuis 1 an et 3 mois",
    earnedBy: "Boosting a Discord server for 1 year and 3 months straight",
  },
  Boost_1_Year_6_Months: {
    description: "Boost depuis 1 an et 6 mois",
    earnedBy: "Boosting a Discord server for 1 year and 6 months straight",
  },
  Boost_2_Years: {
    description: "Boost depuis 2 ans",
    earnedBy: "Boosting a Discord server for 2 years straight",
  },
  Orbs_Apprentice: {
    description: "Orbs Apprentice",
    earnedBy: "Complete specific quests and purchase from Orbs Exclusives shop",
  },
  Quest_Completed: {
    description: "Completed a Quest",
    earnedBy: "When completing a quest from the gift inventory tab",
  },
  Discord_Lootbox: {
    description: "A clown, for a limited time",
    earnedBy: "Unlock all Lootbox rewards during Discord April Fools event",
  },
  Original_Username: {
    description: "Originally known as",
    earnedBy: "When changing to the new username system with a unique username tag",
  },
  Supports_Commands: {
    description: "Supports Commands",
    earnedBy: "Bot must use application commands to earn this badge",
  },
  Uses_Automod: {
    description: "Uses Automod",
    earnedBy: "100 active automod rules created",
  },
  Premium_Bot: {
    description: "This server has _App Name_ premium",
    earnedBy: "Given to premium APPS on the server that bought premium using Discord's in-app purchase option",
  },
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

export const getBadgeInfo = (badgeKey: string) => {
  return BADGE_INFO[badgeKey] || { description: "", earnedBy: "" };
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
                  {badgeInfo.description && (
                    <div className="pointer-events-none invisible group-hover:visible absolute z-[100] bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 px-3 py-2 bg-gray-900/95 backdrop-blur-sm text-white text-xs rounded-lg shadow-xl border border-white/20">
                      <div className="flex items-start gap-2">
                        {(() => {
                          const tooltipImage = getBadgeTooltipImage(badge.key);
                          const isNitro = badge.key.startsWith("Nitro_");
                          return tooltipImage ? (
                            <img
                              src={tooltipImage}
                              alt={badge.name}
                              className={isNitro ? "h-6 w-6 object-contain flex-shrink-0 mt-0.5" : "h-5 w-5 object-contain flex-shrink-0 mt-0.5"}
                            />
                          ) : null;
                        })()}
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm mb-1">
                            {badgeInfo.description}
                          </div>
                          {badgeInfo.earnedBy && (
                            <div className="text-gray-300 text-[11px] leading-relaxed break-words">
                              {badgeInfo.earnedBy}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-900/95"></div>
                    </div>
                  )}
                </div>
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
            const badgeImage = getBadgeImage(badgeKey);
            const displayName = badge.variant 
              ? `${badge.name.split(" ")[0]} ${badge.variant}`
              : badge.name;

            return (
              <div
                key={badgeKey}
                className="flex items-center gap-1 rounded-md border border-white/20 bg-white/5 px-2 py-1"
                title={displayName}
              >
                {badgeImage && (
                  <img
                    src={badgeImage}
                    alt={displayName}
                    className="h-4 w-4 object-contain"
                  />
                )}
                <span className="text-xs text-gray-300">{displayName}</span>
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

