import { useQuery } from "@tanstack/react-query";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  company: string;
  location: string;
  email: string;
  blog: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  topics: string[];
}

interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  html_url: string;
  repository: {
    name: string;
    full_name: string;
  };
}

interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
  };
  repo: {
    name: string;
  };
  created_at: string;
  payload: any;
}

interface GitHubContribution {
  date: string;
  contributionCount: number;
}

interface GitHubContributionsResponse {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
            }>;
          }>;
        };
      };
    };
  };
  errors?: Array<{
    message: string;
    type: string;
    path: string[];
  }>;
}

// Fetch user data
const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error("Failed to fetch GitHub user data");
  }
  return response.json();
};

// Fetch user repositories
const fetchGitHubRepositories = async (
  username: string
): Promise<GitHubRepository[]> => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repositories");
  }
  return response.json();
};

// Fetch user events (activity)
const fetchGitHubEvents = async (username: string): Promise<GitHubEvent[]> => {
  const response = await fetch(
    `https://api.github.com/users/${username}/events?per_page=100`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch GitHub events");
  }
  return response.json();
};

// Custom hook for user data
export const useGitHubUser = (username: string) => {
  return useQuery({
    queryKey: ["github-user", username],
    queryFn: () => fetchGitHubUser(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for repositories data
export const useGitHubRepositories = (username: string) => {
  return useQuery({
    queryKey: ["github-repositories", username],
    queryFn: () => fetchGitHubRepositories(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for events data
export const useGitHubEvents = (username: string) => {
  return useQuery({
    queryKey: ["github-events", username],
    queryFn: () => fetchGitHubEvents(username),
    enabled: !!username,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Add this new hook for fetching contributions via GraphQL
export function useGitHubContributions(username: string, year: number) {
  return useQuery({
    queryKey: ["github-contributions", username, year],
    queryFn: async (): Promise<GitHubContribution[]> => {
      // Check if token is available
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      if (!token) {
        console.warn(
          "No GitHub token provided. GitHub activity will only show recent events (last 30 days)."
        );
        return [];
      }

      const startDate = `${year}-01-01T00:00:00Z`;
      const endDate = `${year}-12-31T23:59:59Z`;

      const query = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query,
          variables: {
            username,
            from: startDate,
            to: endDate,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`GitHub GraphQL API error: ${response.status}`);
      }

      const data: GitHubContributionsResponse = await response.json();

      if (data.errors) {
        console.error("GraphQL errors:", data.errors);
        throw new Error("GraphQL query failed");
      }

      if (!data.data?.user?.contributionsCollection) {
        throw new Error("User not found or no contributions data");
      }

      // Flatten the weeks/days structure
      const contributions: GitHubContribution[] = [];
      data.data.user.contributionsCollection.contributionCalendar.weeks.forEach(
        (week) => {
          week.contributionDays.forEach((day) => {
            contributions.push({
              date: day.date,
              contributionCount: day.contributionCount,
            });
          });
        }
      );

      return contributions;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    enabled: !!username,
    retry: false, // Don't retry on failure, fall back to events API
  });
}

// Add this new hook for fetching multi-year contributions for accurate streak calculations
export function useGitHubMultiYearContributions(username: string) {
  return useQuery({
    queryKey: ["github-multi-year-contributions", username],
    queryFn: async (): Promise<GitHubContribution[]> => {
      // Check if token is available
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      if (!token) {
        console.warn(
          "No GitHub token provided. Streak calculations will be limited."
        );
        return [];
      }

      // Get contributions from the last 3 years to current year (enough for accurate streaks)
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - 2; // Last 3 years should be sufficient for most streaks

      const allContributions: GitHubContribution[] = [];

      // Fetch contributions for each year
      for (let year = startYear; year <= currentYear; year++) {
        try {
          const startDate = `${year}-01-01T00:00:00Z`;
          const endDate = `${year}-12-31T23:59:59Z`;

          const query = `
            query($username: String!, $from: DateTime!, $to: DateTime!) {
              user(login: $username) {
                contributionsCollection(from: $from, to: $to) {
                  contributionCalendar {
                    weeks {
                      contributionDays {
                        date
                        contributionCount
                      }
                    }
                  }
                }
              }
            }
          `;

          const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              query,
              variables: {
                username,
                from: startDate,
                to: endDate,
              },
            }),
          });

          if (!response.ok) {
            console.warn(
              `Failed to fetch contributions for ${year}: ${response.status}`
            );
            continue;
          }

          const data: GitHubContributionsResponse = await response.json();

          if (data.errors) {
            console.warn(`GraphQL errors for ${year}:`, data.errors);
            continue;
          }

          if (data.data?.user?.contributionsCollection) {
            // Flatten the weeks/days structure for this year
            data.data.user.contributionsCollection.contributionCalendar.weeks.forEach(
              (week) => {
                week.contributionDays.forEach((day) => {
                  allContributions.push({
                    date: day.date,
                    contributionCount: day.contributionCount,
                  });
                });
              }
            );
          }
        } catch (error) {
          console.warn(`Error fetching contributions for ${year}:`, error);
          continue;
        }
      }

      return allContributions;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!username,
    retry: false,
  });
}

// Export types for use in components
export type {
  GitHubUser,
  GitHubRepository,
  GitHubCommit,
  GitHubEvent,
  GitHubContribution,
};
