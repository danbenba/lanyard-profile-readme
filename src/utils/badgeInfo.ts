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

export const getBadgeInfo = (badgeKey: string) => {
  return BADGE_INFO[badgeKey] || { description: "", earnedBy: "" };
};
