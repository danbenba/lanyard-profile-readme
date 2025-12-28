import { Badges } from "./badges";

// URLs des badges Nitro évolutifs (PNG pour affichage) (LOCAL)
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

// URLs des badges Boost (LOCAL)
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

// Mapping des nouveaux badges vers leurs assets locaux (PNG pour affichage)
const NEW_BADGE_URLS: Record<string, string> = {
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

// Helper pour obtenir l'image d'un badge (PNG pour affichage réduit)
// Version serveur - peut être utilisée dans les composants serveur
export const getBadgeImage = (badgeKey: string): string | undefined => {
  // Badges avec URLs locales
  if (NEW_BADGE_URLS[badgeKey]) {
    return NEW_BADGE_URLS[badgeKey];
  }
  // Badges normaux (base64)
  const badge = Badges[badgeKey as keyof typeof Badges];
  return badge ? `data:image/png;base64,${badge}` : undefined;
};

