import { queryOptions } from "@tanstack/react-query";

import { fetchCities } from "@/lib/api/cities";

/**
 * Hierarchical query key factory for cities.
 */
export const cityKeys = {
  all: ["cities"] as const,
  lists: () => [...cityKeys.all, "list"] as const,
  list: () => [...cityKeys.lists()] as const,
} as const;

/**
 * Query options factory for cities.
 * Cities change rarely — use a long staleTime.
 */
export const cityQueries = {
  list: (token?: string) =>
    queryOptions({
      queryKey: cityKeys.list(),
      queryFn: () => fetchCities(token),
      staleTime: 10 * 60 * 1000, // 10 minutes — cities are mostly static
    }),
};
