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
import {
  Github,
  Star,
  GitFork,
  ChevronDown,
  ExternalLink,
  Calendar,
  Users,
  BookOpen,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  useGitHubUser,
  useGitHubRepositories,
  useGitHubEvents,
  useGitHubContributions,
  useGitHubMultiYearContributions,
  type GitHubUser,
  type GitHubRepository,
  type GitHubEvent,
  type GitHubContribution,
} from "@/hooks/useGitHubData";
import Image from "next/image";

interface GitHubActivityProps {
  username: string;
  className?: string;
}

const GitHubActivity: React.FC<GitHubActivityProps> = ({
  username,
  className = "",
}) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Use React Query hooks for data fetching
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGitHubUser(username);
  const {
    data: repositories = [],
    isLoading: reposLoading,
    error: reposError,
  } = useGitHubRepositories(username);
  const {
    data: events = [],
    isLoading: eventsLoading,
    error: eventsError,
  } = useGitHubEvents(username);
  const {
    data: contributions = [],
    isLoading: contributionsLoading,
    error: contributionsError,
  } = useGitHubContributions(username, selectedYear);
  const {
    data: multiYearContributions = [],
    isLoading: multiYearLoading,
    error: multiYearError,
  } = useGitHubMultiYearContributions(username);

  // Determine which data source to use for activity (heatmap)
  const hasContributions = contributions && contributions.length > 0;
  const activityData = useMemo(() => {
    if (hasContributions) {
      return generateActivityDataFromContributions(contributions);
    } else {
      return generateActivityData(events, selectedYear);
    }
  }, [contributions, events, selectedYear, hasContributions]);

  // Generate all-time activity data for streak calculations
  const allTimeActivityData = useMemo(() => {
    if (multiYearContributions && multiYearContributions.length > 0) {
      return generateActivityDataFromContributions(multiYearContributions);
    } else {
      // Fallback to events data for multiple years
      return generateAllTimeActivityData(events);
    }
  }, [multiYearContributions, events]);

  const { weeks, months } = useMemo(
    () => generateGridData(activityData, selectedYear),
    [activityData, selectedYear]
  );

  const totalContributions = useMemo(
    () =>
      Object.values(activityData).reduce(
        (sum: number, count: number) => sum + count,
        0
      ),
    [activityData]
  );

  const isLoading =
    userLoading ||
    reposLoading ||
    eventsLoading ||
    contributionsLoading ||
    multiYearLoading;
  const error =
    userError ||
    reposError ||
    eventsError ||
    contributionsError ||
    multiYearError;

  // Use all-time data for streak calculations
  const maxStreak = useMemo(
    () => calculateMaxStreak(allTimeActivityData),
    [allTimeActivityData]
  );
  const currentStreak = useMemo(
    () => calculateCurrentStreak(allTimeActivityData),
    [allTimeActivityData]
  );

  // Memoized calculations - use contributions data instead of events for the grid
  const availableYears = useMemo(() => getAvailableYears(events), [events]);
  const languageStats = useMemo(
    () => calculateLanguageStats(repositories),
    [repositories]
  );
  const totalStars = useMemo(
    () => repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    [repositories]
  );

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
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
            <Github className="h-5 w-5" />
            GitHub Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">
            Failed to load GitHub data. Please try again later.
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
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              <CardTitle>GitHub Activity</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {selectedYear} <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <DropdownMenuItem
                        key={year}
                        onClick={() => setSelectedYear(year)}
                      >
                        {year}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <CardDescription>
            {hasContributions
              ? `Full year contribution history for ${selectedYear}`
              : `Recent activity (last 30 days) - Add GitHub token for full year history`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {user.public_repos}
              </div>
              <div className="text-sm text-muted-foreground">Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {totalStars}
              </div>
              <div className="text-sm text-muted-foreground">Stars</div>
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

          {/* Profile Info */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Image
                width={40}
                height={40}
                src={user.avatar_url}
                alt={user.name || user.login}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">{user.name || user.login}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  {user.followers} followers
                </div>
              </div>
            </div>
          </div>

          {/* Activity Heatmap */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Contribution Activity</span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-sm bg-gray-100 dark:bg-gray-800"></div>
                  <div className="w-2 h-2 rounded-sm bg-green-200 dark:bg-green-900"></div>
                  <div className="w-2 h-2 rounded-sm bg-green-300 dark:bg-green-800"></div>
                  <div className="w-2 h-2 rounded-sm bg-green-400 dark:bg-green-700"></div>
                  <div className="w-2 h-2 rounded-sm bg-green-500 dark:bg-green-600"></div>
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
                                className={`w-2.5 h-2.5 rounded-sm cursor-pointer hover:ring-2 hover:ring-green-300 transition-all ${
                                  day.isCurrentYear
                                    ? getActivityLevel(day.count)
                                    : "bg-gray-50 dark:bg-gray-900"
                                }`}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">
                                {day.count} contribution
                                {day.count !== 1 ? "s" : ""} on{" "}
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
              {languageStats
                .slice(0, 6)
                .map(({ language, count, percentage }) => (
                  <div
                    key={language}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: getLanguageColor(language),
                          }}
                        />
                        <span className="font-medium text-sm">{language}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {count} repositories ({percentage.toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Top Repositories */}
          <div className="space-y-2">
            <span className="text-sm font-medium">Popular Repositories</span>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {repositories
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 5)
                .map((repo) => (
                  <div
                    key={repo.id}
                    className="flex items-center justify-between text-xs p-3 bg-gray-50 dark:bg-gray-800 rounded border"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="h-3 w-3 text-blue-600" />
                        <span className="font-medium truncate">
                          {repo.name}
                        </span>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-blue-600"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <p className="text-muted-foreground text-xs truncate">
                        {repo.description || "No description"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 ml-3">
                      {repo.language && (
                        <div className="flex items-center gap-1">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: getLanguageColor(repo.language),
                            }}
                          />
                          <span className="text-xs">{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-2">
            <span className="text-sm font-medium">
              Recent Activity ({selectedYear})
            </span>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {events
                .filter(
                  (event) =>
                    new Date(event.created_at).getFullYear() === selectedYear
                )
                .slice(0, 5)
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between text-xs p-2 bg-gray-50 dark:bg-gray-800 rounded"
                  >
                    <span className="truncate mr-2">
                      {getEventDescription(event)}
                    </span>
                    <span className="text-muted-foreground whitespace-nowrap">
                      {new Date(event.created_at).toLocaleDateString()}
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

// Helper functions
function generateActivityDataFromContributions(
  contributions: GitHubContribution[]
): Record<string, number> {
  const activityMap: Record<string, number> = {};

  // Convert contributions to activity map
  contributions.forEach((contribution) => {
    activityMap[contribution.date] = contribution.contributionCount;
  });

  return activityMap;
}

function generateAllTimeActivityData(
  events: GitHubEvent[]
): Record<string, number> {
  const activityMap: Record<string, number> = {};

  // Count events per day across all years
  events.forEach((event) => {
    const eventDate = new Date(event.created_at);
    const date = eventDate.toISOString().split("T")[0];

    // Weight different event types
    const weight = getEventWeight(event.type);
    activityMap[date] = (activityMap[date] || 0) + weight;
  });

  return activityMap;
}

function generateActivityData(
  events: GitHubEvent[],
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

  // Count events per day
  events.forEach((event) => {
    const eventDate = new Date(event.created_at);
    if (eventDate.getFullYear() === selectedYear) {
      const date = eventDate.toISOString().split("T")[0];
      if (activityMap[date] !== undefined) {
        // Weight different event types
        const weight = getEventWeight(event.type);
        activityMap[date] += weight;
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
  if (count <= 2) return "bg-green-200 dark:bg-green-900";
  if (count <= 4) return "bg-green-300 dark:bg-green-800";
  if (count <= 6) return "bg-green-400 dark:bg-green-700";
  return "bg-green-500 dark:bg-green-600";
}

function getAvailableYears(events: GitHubEvent[]): number[] {
  const years = new Set<number>();
  const currentYear = new Date().getFullYear();

  // Add current year and previous years
  for (let i = 0; i < 5; i++) {
    years.add(currentYear - i);
  }

  // Add years from events data
  events.forEach((event) => {
    years.add(new Date(event.created_at).getFullYear());
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

function calculateLanguageStats(repositories: GitHubRepository[]): Array<{
  language: string;
  count: number;
  percentage: number;
}> {
  const languageCount: Record<string, number> = {};
  let totalRepos = 0;

  repositories.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      totalRepos++;
    }
  });

  return Object.entries(languageCount)
    .map(([language, count]) => ({
      language,
      count,
      percentage: (count / totalRepos) * 100,
    }))
    .sort((a, b) => b.count - a.count);
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#239120",
    PHP: "#4F5D95",
    Ruby: "#701516",
    Go: "#00ADD8",
    Rust: "#dea584",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    Dart: "#00B4AB",
    HTML: "#e34c26",
    CSS: "#1572B6",
    Shell: "#89e051",
    Vue: "#2c3e50",
    React: "#61dafb",
  };
  return colors[language] || "#8cc8ff";
}

function getEventWeight(eventType: string): number {
  const weights: Record<string, number> = {
    PushEvent: 2,
    CreateEvent: 1,
    PullRequestEvent: 3,
    IssuesEvent: 1,
    ReleaseEvent: 2,
    ForkEvent: 1,
    WatchEvent: 1,
  };
  return weights[eventType] || 1;
}

function getEventDescription(event: GitHubEvent): string {
  const repo = event.repo.name.split("/")[1] || event.repo.name;

  switch (event.type) {
    case "PushEvent":
      return `Pushed to ${repo}`;
    case "CreateEvent":
      return `Created ${repo}`;
    case "PullRequestEvent":
      return `Pull request in ${repo}`;
    case "IssuesEvent":
      return `Issue in ${repo}`;
    case "ReleaseEvent":
      return `Released ${repo}`;
    case "ForkEvent":
      return `Forked ${repo}`;
    case "WatchEvent":
      return `Starred ${repo}`;
    default:
      return `Activity in ${repo}`;
  }
}

export default GitHubActivity;
