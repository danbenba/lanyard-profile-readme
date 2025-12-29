"use client";

import React, { useState, JSX, useEffect } from "react";
import { motion } from "motion/react";
import { isSnowflake } from "@/utils/snowflake";
import { IParameterInfo, PARAMETER_INFO } from "@/utils/parameters";
import * as Icon from "lucide-react";
import { cn, filterLetters } from "@/lib/utils";
import { BadgeSelector } from "@/components/BadgeSelector";
import ErrorCard from "@/components/ErrorCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { ProfilePreview } from "@/components/ProfilePreview";
import { getFlags } from "@/utils/helpers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

export default function Home() {
  const ORIGIN_URL =
    process.env.NEXT_PUBLIC_ORIGIN_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://lanyard.cnrad.dev");

  const [userId, setUserId] = useState("");
  const [userError, setUserError] = useState<string | JSX.Element>();

  const [isLoaded, setIsLoaded] = useState(false);
  const [options, setOptions] = useState<Record<string, string | boolean>>({});
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [showBadgeSelector, setShowBadgeSelector] = useState(false);
  const [autoDetectedBadges, setAutoDetectedBadges] = useState<string[]>([]);

  async function onLoadDiscordId(userId: string) {
    setUserId(userId);
    setIsLoaded(false);
    setUserError(undefined);
    setAutoDetectedBadges([]);

    if (userId.length < 1) return;
    if (userId.length > 0 && !isSnowflake(userId))
      return setUserError("Invalid Discord ID");

    if (isSnowflake(userId)) {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await response.json() as { success?: boolean; data?: { discord_user?: { public_flags?: number; avatar?: string } } };
        if (data.success && data.data?.discord_user) {
          const flags: string[] = [];
          if (data.data.discord_user.public_flags) {
            flags.push(...getFlags(data.data.discord_user.public_flags));
          }
          if (data.data.discord_user.avatar?.includes("a_")) {
            flags.push("Nitro");
          }
          setAutoDetectedBadges(flags);
          setSelectedBadges((prev) => prev.filter((badge) => !flags.includes(badge)));
        }
      } catch (error) {
      }
    }
  }

  const urlParams = [
    ...Object.keys(options).map(
      (option) => `${option}=${options[option]}`
    ),
    ...(selectedBadges.length > 0
      ? [`customBadges=${selectedBadges.join(",")}`]
      : []),
  ];

  const url = `${ORIGIN_URL}/api/${userId}${urlParams.length > 0 ? `?${urlParams.join("&")}` : ""
    }`;

  return (
    <>
      <main className="flex min-h-screen max-w-[100vw] flex-col items-center max-sm:px-4">
        <div className="relative mt-16 flex w-auto flex-row gap-8">
          <MainSection url={url} userId={userId} selectedBadges={selectedBadges} className="max-lg:hidden" />

          <div className="w-full sm:max-w-[30rem]">
            <p className="text-left text-3xl font-semibold text-[#cecece] mb-2">
              🏷️ lanyard-profile-readme{" "}
            </p>

            <p className="mb-2 text-sm text-[#aaabaf]">
              Uses{" "}
              <a
                href="https://github.com/Phineas/lanyard"
                target="_blank"
                rel="noreferrer noopener"
                className="text-white underline decoration-transparent underline-offset-2 transition-colors duration-150 ease-out hover:decoration-white"
              >
                Lanyard
              </a>{" "}
              to display your Discord Presence anywhere.
            </p>

            <div className="flex h-[2.25rem] w-full flex-row gap-2">
              <Input
                className="font-mono text-sm shadow-none"
                onChange={(e) => onLoadDiscordId(e.target.value)}
                value={userId || ""}
                placeholder="Enter your Discord ID"
              />
            </div>

            {!isLoaded ? (
              <motion.p
                variants={{
                  open: { opacity: 1, display: "block" },
                  closed: { opacity: 0, display: "none" },
                }}
                initial="closed"
                animate={userError ? "open" : "closed"}
                className="mt-1 text-sm text-red-500"
                transition={{ duration: 0.15 }}
              >
                {userError}
              </motion.p>
            ) : null}

            <MainSection
              url={url}
              userId={userId}
              selectedBadges={selectedBadges}
              className="block lg:hidden"
            />

            <div
              className={cn(
                "flex flex-col text-white mt-4 p-3 border border-zinc-800 bg-zinc-900/50 rounded-lg mb-4"
              )}
            >
              <div className="grid-rows-auto mb-4 flex w-full flex-col gap-2.5 sm:grid sm:grid-cols-2">
                {PARAMETER_INFO.filter((item) => item.type !== "boolean").map(
                  (item) => {
                    return (
                      <div
                        key={item.parameter}
                        className="flex flex-col gap-1.5"
                      >
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-normal text-muted-foreground">{item.title}</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Icon.InfoIcon
                                  size={14}
                                  className="rounded-md text-zinc-700 transition hover:text-gray-400 cursor-help"
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                {item.description || "Unknown"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        {item.type === "string" && (
                          <Input
                            className="relative h-8 w-full border-zinc-800 bg-zinc-950/50 px-2 py-0.5 text-sm shadow-none placeholder:text-white/30"
                            placeholder={item.options?.placeholder || "..."}
                            onChange={(e) => {
                              if (e.target.value.length < 1) {
                                const prevOptions = { ...options };
                                delete prevOptions[item.parameter];
                                return setOptions(prevOptions);
                              }

                              const filteredValue = encodeURIComponent(
                                filterLetters(
                                  e.target.value,
                                  (
                                    PARAMETER_INFO.find(
                                      (p) => p.parameter === item.parameter
                                    ) as { options: { omit: string[] } }
                                  ).options.omit
                                )
                              );

                              setOptions((prev) => ({
                                ...prev,
                                [item.parameter]: filteredValue,
                              }));
                            }}
                            value={decodeURIComponent(
                              (options[item.parameter] as string) || ""
                            )}
                          />
                        )}

                        {item.type === "list" && (
                          <Select
                            value={(options[item.parameter] as string) || ""}
                            onValueChange={(value) => {
                              if (value === "none_value") {
                                const prevOptions = { ...options };
                                delete prevOptions[item.parameter];
                                return setOptions(prevOptions);
                              }

                              setOptions((prev) => ({
                                ...prev,
                                [item.parameter]: value,
                              }));
                            }}
                          >
                            <SelectTrigger className="h-8 w-full border-zinc-800 bg-zinc-950/50 text-sm shadow-none">
                              <SelectValue placeholder="None" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                              <SelectItem value="none_value">None</SelectItem>
                              {item.options.list.map((option) => (
                                <SelectItem value={option.value} key={option.value}>
                                  {option.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    );
                  }
                )}
              </div>

              {/* Separated for easier styling/readability */}
              <div className="sm:grid-rows-auto flex flex-col gap-2 sm:grid sm:grid-cols-2">
                {(
                  PARAMETER_INFO.filter(
                    (item) => item.type === "boolean"
                  ) as Extract<IParameterInfo[number], { type: "boolean" }>[]
                ).map((item) => {
                  return (
                    <div
                      key={item.parameter}
                      className="flex flex-row items-center gap-2.5 text-sm"
                    >
                      <Checkbox
                        id={item.parameter}
                        checked={options[item.parameter] === !item.invertBoolean}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setOptions((prev) => ({
                              ...prev,
                              [item.parameter]: item.invertBoolean
                                ? false
                                : true,
                            }));
                          } else {
                            const prevOptions = { ...options };
                            delete prevOptions[item.parameter];
                            setOptions(prevOptions);
                          }
                        }}
                      />

                      <Label
                        htmlFor={item.parameter}
                        className="text-gray-300 font-normal cursor-pointer"
                        style={{
                          textDecoration: PARAMETER_INFO.find(
                            (p) => p.parameter === item.parameter
                          )?.deprecated
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {item.title}
                      </Label>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Icon.InfoIcon
                              size={14}
                              className="rounded-md text-zinc-700 transition hover:text-gray-400 cursor-help"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            {item.description || "Unknown"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  );
                })}
              </div>

              {!options.hideBadges && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShowBadgeSelector(!showBadgeSelector)}
                    className="flex flex-row items-center justify-center gap-2 mt-4 text-sm w-full rounded-full"
                  >
                    {showBadgeSelector ? (
                      <>
                        <Icon.ChevronUp size={14} />
                        Masquer les badges
                      </>
                    ) : (
                      <>
                        <Icon.Award size={14} />
                        Personnaliser les badges
                      </>
                    )}
                  </Button>

                  {showBadgeSelector && (
                    <div className="mt-4 p-4 border border-white/10 bg-zinc-900/50 rounded-lg">
                      <BadgeSelector
                        selectedBadges={selectedBadges}
                        onBadgesChange={setSelectedBadges}
                        autoDetectedBadges={autoDetectedBadges}
                      />
                    </div>
                  )}
                </>
              )}


              <Button
                variant="outline"
                asChild
                className="flex flex-row items-center justify-center gap-2 mt-4 text-sm w-full rounded-full"
              >
                <a
                  href="https://github.com/cnrad/lanyard-profile-readme?tab=readme-ov-file#options"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  More info
                  <Icon.ExternalLink size={14} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const MainSection = ({
  url,
  userId,
  selectedBadges,
  className,
}: {
  url: string;
  userId: string;
  selectedBadges: string[];
  className: string;
}) => {
  const [copyState, setCopyState] = useState("Copy");
  const [outputType, setOutputType] = useState<"markdown" | "html" | "url">(
    "markdown"
  );
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errorData, setErrorData] = useState<{
    message: string;
    settings: any;
  } | null>(null);

  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [url]);

  const copyContent = {
    markdown: `[![Discord Presence](${url})](https://discord.com/users/${userId})`,
    html: `<a href="https://discord.com/users/${userId}"><img src="${url}" /></a>`,
    url: `${url}`,
  };

  return (
    <div
      className={cn(
        "mt-2 flex flex-col gap-2 w-full sm:min-w-[30rem] sm:max-w-[30rem]",
        className
      )}
    >
      {userId.length > 0 && isSnowflake(userId) ? (
        <>
          {!imageError ? (
            <ProfilePreview
              imageUrl={url}
              selectedBadges={selectedBadges}
              userId={userId}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                fetch(url)
                  .then((res) => {
                    const contentType = res.headers.get("content-type");
                    if (contentType?.includes("application/json")) {
                      return res.json().then((data: any) => {
                        if (!data.success && (data.error?.code === "user_not_monitored" || data.data?.code === "user_not_monitored")) {
                          const params = new URLSearchParams(url.split("?")[1] || "");
                          const settings = {
                            theme: params.get("theme") || "dark",
                            bg: params.get("bg"),
                            borderRadius: params.get("borderRadius") || "10px",
                            customBadges: params.get("customBadges")?.split(",") || [],
                          };
                          setErrorData({
                            message: data.error?.message || data.data?.message || "L'utilisateur n'est pas surveillé par Lanyard",
                            settings: settings,
                          });
                          setImageError(true);
                          setImageLoaded(true);
                        } else {
                          setImageError(true);
                          setImageLoaded(true);
                        }
                      });
                    } else {
                      setImageError(true);
                      setImageLoaded(true);
                    }
                  })
                  .catch(() => {
                    setImageError(true);
                    setImageLoaded(true);
                  });
              }}
            />
          ) : null}
          {imageLoaded && imageError && errorData ? (
            <div className="w-full flex flex-col items-center gap-3">
              <div className="w-full max-w-[410px]">
                <ErrorCard
                  settings={errorData.settings}
                  errorMessage={errorData.message}
                  userId={userId}
                />
              </div>
              <button
                onClick={() => {
                  setImageError(false);
                  setImageLoaded(false);
                  setErrorData(null);
                }}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Réessayer
              </button>
            </div>
          ) : imageLoaded && imageError ? (
            <div className="w-full min-h-64 rounded-xl border border-red-500/20 bg-red-500/5 flex flex-col items-center justify-center text-white/75 font-mono text-sm px-16 text-center gap-3">
              <div className="text-red-400 text-4xl">⚠️</div>
              <p className="font-semibold">Erreur lors du chargement</p>
              <button
                onClick={() => {
                  setImageError(false);
                  setImageLoaded(false);
                }}
                className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Réessayer
              </button>
            </div>
          ) : null}
          {!imageLoaded && !imageError && <SkeletonCard />}
        </>
      ) : (
        <div className="w-full min-h-64 rounded-xl border border-white/10 bg-gray-50/5 flex items-center justify-center text-white/25 font-mono text-sm px-16 text-center">
          Enter your Discord ID to preview your Lanyard Banner
        </div>
      )}

      <div className="mt-4 grid grid-cols-3 gap-1">
        {(["markdown", "html", "url"] as const).map((type) => (
          <Button
            key={type}
            variant={outputType === type ? "secondary" : "ghost"}
            size="sm"
            className={cn(
              "rounded-md border border-zinc-800 font-mono text-sm font-medium uppercase tracking-wide transition-colors duration-100 ease-out",
              {
                "border-white/30 font-semibold": outputType === type,
              }
            )}
            onClick={() => setOutputType(type)}
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="break-all rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-sm text-blue-400 my-2">
        {copyContent[outputType]}
      </div>

      <Button
        variant="outline"
        className="w-full mt-4 bg-zinc-900 border border-zinc-800 font-mono text-sm font-medium transition-colors duration-75 ease-out hover:bg-zinc-800/75 hover:text-white"
        onClick={() => {
          navigator.clipboard.writeText(copyContent[outputType]);
          setCopyState("Copied!");
          setTimeout(() => setCopyState("Copy"), 1500);
        }}
      >
        {copyState}
      </Button>
    </div>
  );
};
