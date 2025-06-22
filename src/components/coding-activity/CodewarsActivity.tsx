"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Trophy, Star, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  useCodewarsUser,
  useCodewarsChallenges,
  type CodewarsUser,
  type CompletedChallenge,
} from "@/hooks/useCodewarsData";

interface CodewarsActivityProps {
  username: string;
  className?: string;
}

const CodewarsActivity: React.FC<CodewarsActivityProps> = ({
  username,
  className = "",
}) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Use React Query hooks for data fetching
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useCodewarsUser(username);
  const {
    data: challenges = [],
    isLoading: challengesLoading,
    error: challengesError,
  } = useCodewarsChallenges(username);

  const isLoading = userLoading || challengesLoading;
  const error = userError || challengesError;

  // Memoized calculations to avoid recalculation on every render
  const activityData = useMemo(
    () => generateActivityData(challenges, selectedYear),
    [challenges, selectedYear]
  );

  // Generate all-time activity data for streak calculations
  const allTimeActivityData = useMemo(
    () => generateAllTimeActivityData(challenges),
    [challenges]
  );

  const { weeks, months } = useMemo(
    () => generateGridData(activityData, selectedYear),
    [activityData, selectedYear]
  );
  const totalSolved = useMemo(
    () => Object.values(activityData).reduce((sum, count) => sum + count, 0),
    [activityData]
  );

  // Use all-time data for streak calculations
  const maxStreak = useMemo(
    () => calculateMaxStreak(activityData),
    [activityData]
  );
  const currentStreak = useMemo(
    () => calculateCurrentStreak(allTimeActivityData),
    [allTimeActivityData]
  );

  const availableYears = useMemo(
    () => getAvailableYears(challenges),
    [challenges]
  );

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-red-600" />
            Codewars Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !user) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-red-600" />
            Codewars Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">
            Failed to load Codewars data. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-red-600" />
                Codewars Activity
              </CardTitle>
              <CardDescription>
                {totalSolved} kata completed in {selectedYear}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {selectedYear}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {availableYears.map((year) => (
                  <DropdownMenuItem
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={
                      selectedYear === year ? "bg-red-50 dark:bg-red-950" : ""
                    }
                  >
                    {year}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {user.honor.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Honor</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{maxStreak}</div>
              <div className="text-sm text-muted-foreground">Max Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{currentStreak}</div>
              <div className="text-sm text-muted-foreground">
                Current Streak
              </div>
            </div>
          </div>

          {/* Rank Badge */}
          <div className="flex items-center justify-center">
            <Badge
              className={`${getRankColor(
                user.ranks.overall.color
              )} px-3 py-1 hover:bg-red-600 hover:text-white`}
            >
              <Star className="h-3 w-3 mr-1" />
              {user.ranks.overall.name}
            </Badge>
          </div>

          {/* Activity Heatmap */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Contribution Activity</span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-sm bg-gray-100 dark:bg-gray-800"></div>
                  <div className="w-2 h-2 rounded-sm bg-red-200 dark:bg-red-900"></div>
                  <div className="w-2 h-2 rounded-sm bg-red-300 dark:bg-red-800"></div>
                  <div className="w-2 h-2 rounded-sm bg-red-400 dark:bg-red-700"></div>
                  <div className="w-2 h-2 rounded-sm bg-red-500 dark:bg-red-600"></div>
                </div>
                <span>More</span>
              </div>
            </div>

            <div className="overflow-x-auto flex justify-center">
              <div className="inline-block">
                {/* Month labels */}
                <div className="flex mb-1 ml-8">
                  {months.map((month, index) => (
                    <div
                      key={index}
                      className="text-xs text-muted-foreground"
                      style={{
                        width: `${
                          month.width > 0
                            ? month.width * 14 -
                              (index === months.length - 1 ? 4 : 0)
                            : 0
                        }px`,
                      }}
                    >
                      {month.name}
                    </div>
                  ))}
                </div>

                {/* Grid with day labels */}
                <div className="flex">
                  {/* Day of week labels */}
                  <div className="flex flex-col gap-1 mr-2">
                    {["Sat", "", "Mon", "", "Wed", "", "Fri", ""].map(
                      (day, index) => (
                        <div key={index} className="h-2.5 flex items-center">
                          <span className="text-xs text-muted-foreground w-6 text-right">
                            {day}
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  {/* Activity grid */}
                  <div className="flex gap-1">
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((day, dayIndex) => (
                          <Tooltip key={`${weekIndex}-${dayIndex}`}>
                            <TooltipTrigger asChild>
                              <div
                                className={`w-2.5 h-2.5 rounded-sm cursor-pointer hover:ring-2 hover:ring-red-300 transition-all ${
                                  day.isCurrentYear
                                    ? getActivityLevel(day.count)
                                    : "bg-gray-50 dark:bg-gray-900"
                                }`}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">
                                {day.count} kata{day.count !== 1 ? "s" : ""} on{" "}
                                {new Date(day.date).toLocaleDateString()}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Languages */}
          <div className="space-y-2">
            <span className="text-sm font-medium">Top Languages</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(user.ranks.languages)
                .sort(([, a], [, b]) => b.score - a.score)
                .slice(0, 6)
                .map(([language, data]) => (
                  <div
                    key={language}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm capitalize">
                          {language}
                        </span>
                        <Badge
                          className={`${getRankColor(
                            data.color
                          )} text-xs px-2 py-0.5 hover:bg-red-600 hover:text-white`}
                        >
                          {data.name}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {data.score.toLocaleString()} points
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-2">
            <span className="text-sm font-medium">
              Recent Challenges ({selectedYear})
            </span>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {challenges
                .filter(
                  (challenge) =>
                    new Date(challenge.completedAt).getFullYear() ===
                    selectedYear
                )
                .slice(0, 3)
                .map((challenge) => (
                  <div
                    key={challenge.id}
                    className="flex items-center justify-between text-xs p-2 bg-gray-50 dark:bg-gray-800 rounded"
                  >
                    <span className="truncate mr-2">{challenge.name}</span>
                    <span className="text-muted-foreground whitespace-nowrap">
                      {new Date(challenge.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

// Helper functions moved outside component to avoid recreation
function generateActivityData(
  challenges: CompletedChallenge[],
  selectedYear: number
): Record<string, number> {
  const startDate = new Date(selectedYear, 0, 1);
  const endDate = new Date(selectedYear, 11, 31);
  const activityMap: Record<string, number> = {};

  // Initialize all days with 0 activity
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateKey = d.toISOString().split("T")[0];
    activityMap[dateKey] = 0;
  }

  // Count challenges completed per day
  challenges.forEach((challenge) => {
    const challengeDate = new Date(challenge.completedAt);
    if (challengeDate.getFullYear() === selectedYear) {
      const date = challengeDate.toISOString().split("T")[0];
      if (activityMap[date] !== undefined) {
        activityMap[date]++;
      }
    }
  });

  return activityMap;
}

function generateGridData(
  activityData: Record<string, number>,
  selectedYear: number
): {
  weeks: Array<Array<{ date: string; count: number; isCurrentYear: boolean }>>;
  months: Array<{ name: string; startWeek: number; width: number }>;
} {
  const startDate = new Date(selectedYear, 0, 1);
  const endDate = new Date(selectedYear, 11, 31);

  // Find the start of the first week (Sunday)
  const firstWeekStart = new Date(startDate);
  firstWeekStart.setDate(firstWeekStart.getDate() - firstWeekStart.getDay());

  // Find the end of the last week (Saturday)
  const lastWeekEnd = new Date(endDate);
  lastWeekEnd.setDate(lastWeekEnd.getDate() + (6 - lastWeekEnd.getDay()));

  const weeks: Array<
    Array<{ date: string; count: number; isCurrentYear: boolean }>
  > = [];
  const months: Array<{ name: string; startWeek: number; width: number }> = [];

  let currentWeek: Array<{
    date: string;
    count: number;
    isCurrentYear: boolean;
  }> = [];
  let currentMonth = -1;
  let monthStartWeek = 0;

  for (
    let d = new Date(firstWeekStart);
    d <= lastWeekEnd;
    d.setDate(d.getDate() + 1)
  ) {
    const dateKey = d.toISOString().split("T")[0];
    // Parse the dateKey back to get the year in the same timezone as the dateKey
    const isCurrentYear =
      new Date(dateKey + "T00:00:00.000Z").getUTCFullYear() === selectedYear;
    const count = activityData[dateKey] || 0;

    // Track months
    if (d.getMonth() !== currentMonth && isCurrentYear) {
      if (currentMonth !== -1) {
        months[months.length - 1].width = weeks.length - monthStartWeek;
      }
      currentMonth = d.getMonth();
      monthStartWeek = weeks.length;
      months.push({
        name: d.toLocaleDateString("en-US", { month: "short" }),
        startWeek: monthStartWeek,
        width: 0,
      });
    }

    currentWeek.push({ date: dateKey, count, isCurrentYear });

    if (d.getDay() === 6) {
      // Saturday, end of week
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Update the last month's width
  if (months.length > 0) {
    months[months.length - 1].width = weeks.length - monthStartWeek;
  }

  return { weeks, months };
}

function getActivityLevel(count: number): string {
  if (count === 0) return "bg-gray-100 dark:bg-gray-800";
  if (count <= 2) return "bg-red-200 dark:bg-red-900";
  if (count <= 4) return "bg-red-300 dark:bg-red-800";
  if (count <= 6) return "bg-red-400 dark:bg-red-700";
  return "bg-red-500 dark:bg-red-600";
}

function getRankColor(color: string): string {
  const colorMap: Record<string, string> = {
    white: "bg-gray-100 text-gray-800",
    yellow: "bg-yellow-100 text-yellow-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    black: "bg-gray-800 text-white",
    red: "bg-red-100 text-red-800",
  };
  return colorMap[color] || "bg-gray-100 text-gray-800";
}

function getAvailableYears(challenges: CompletedChallenge[]): number[] {
  const years = new Set<number>();
  const currentYear = new Date().getFullYear();

  // Add current year and previous years
  for (let i = 0; i < 5; i++) {
    years.add(currentYear - i);
  }

  // Add years from challenges data
  challenges.forEach((challenge) => {
    years.add(new Date(challenge.completedAt).getFullYear());
  });

  return Array.from(years).sort((a, b) => b - a);
}

function calculateMaxStreak(activityData: Record<string, number>): number {
  const dates = Object.keys(activityData).sort();
  let maxStreak = 0;
  let currentStreak = 0;

  for (const date of dates) {
    if (activityData[date] > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return maxStreak;
}

function calculateCurrentStreak(activityData: Record<string, number>): number {
  const today = new Date();
  const todayKey = today.toISOString().split("T")[0];

  // Check if there's a contribution today
  const contributedToday = activityData[todayKey] > 0;

  // Start from today if contributed today, otherwise start from yesterday
  const startDate = contributedToday
    ? today
    : new Date(today.getTime() - 24 * 60 * 60 * 1000);

  let streak = 0;
  let currentDate = new Date(startDate);

  // Count backwards from the start date
  while (true) {
    const dateKey = currentDate.toISOString().split("T")[0];

    if (activityData[dateKey] > 0) {
      streak++;
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

function generateAllTimeActivityData(
  challenges: CompletedChallenge[]
): Record<string, number> {
  const activityMap: Record<string, number> = {};

  // Count challenges completed per day across all time
  challenges.forEach((challenge) => {
    const challengeDate = new Date(challenge.completedAt);
    const date = challengeDate.toISOString().split("T")[0];
    activityMap[date] = (activityMap[date] || 0) + 1;
  });

  return activityMap;
}

export default CodewarsActivity;
