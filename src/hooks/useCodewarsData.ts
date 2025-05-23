import { useQuery } from "@tanstack/react-query";

interface CodewarsUser {
  username: string;
  name: string;
  honor: number;
  clan: string;
  leaderboardPosition: number;
  skills: string[];
  ranks: {
    overall: {
      rank: number;
      name: string;
      color: string;
      score: number;
    };
    languages: Record<
      string,
      {
        rank: number;
        name: string;
        color: string;
        score: number;
      }
    >;
  };
  codeChallenges: {
    totalAuthored: number;
    totalCompleted: number;
  };
}

interface CompletedChallenge {
  id: string;
  name: string;
  slug: string;
  completedAt: string;
  completedLanguages: string[];
}

// Fetch user data
const fetchCodewarsUser = async (username: string): Promise<CodewarsUser> => {
  const response = await fetch(
    `https://www.codewars.com/api/v1/users/${username}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};

// Fetch completed challenges (multiple pages)
const fetchCodewarsChallenges = async (
  username: string
): Promise<CompletedChallenge[]> => {
  const allChallenges: CompletedChallenge[] = [];

  for (let page = 0; page < 5; page++) {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=${page}`
    );
    if (!response.ok) break;

    const data = await response.json();
    allChallenges.push(...data.data);

    if (data.data.length < 200) break; // Last page
  }

  return allChallenges;
};

// Custom hook for user data
export const useCodewarsUser = (username: string) => {
  return useQuery({
    queryKey: ["codewars-user", username],
    queryFn: () => fetchCodewarsUser(username),
    enabled: !!username,
  });
};

// Custom hook for challenges data
export const useCodewarsChallenges = (username: string) => {
  return useQuery({
    queryKey: ["codewars-challenges", username],
    queryFn: () => fetchCodewarsChallenges(username),
    enabled: !!username,
  });
};

// Export types for use in components
export type { CodewarsUser, CompletedChallenge };
