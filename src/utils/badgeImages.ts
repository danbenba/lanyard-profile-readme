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

