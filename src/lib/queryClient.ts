import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 24 hours (86400000 ms)
      staleTime: 24 * 60 * 60 * 1000,
      // Keep data in cache for 25 hours to ensure it's available when stale
      gcTime: 25 * 60 * 60 * 1000,
      // Retry failed requests 2 times
      retry: 2,
      // Don't refetch on window focus since we want daily caching
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect for the same reason
      refetchOnReconnect: false,
    },
  },
});
