import { queryOptions } from "@tanstack/react-query";

import { fetchTours } from "@/lib/api/tours";

/**
 * Hierarchical query key factory for tours.
 * Follows the factory pattern: all → lists → list(filters)
 *
 * Usage:
 *   queryClient.invalidateQueries({ queryKey: tourKeys.all })  → invalidates everything
 *   queryClient.invalidateQueries({ queryKey: tourKeys.lists() }) → invalidates all lists
 */
export const tourKeys = {
  all: ["tours"] as const,
  lists: () => [...tourKeys.all, "list"] as const,
  list: () => [...tourKeys.lists()] as const,
} as const;

/**
 * Query options factory for tours.
 * Combines query keys + query functions + caching config in one place.
 *
 * Usage (server prefetch):
 *   await queryClient.prefetchQuery(tourQueries.list(token))
 *
 * Usage (client):
 *   const { data } = useSuspenseQuery(tourQueries.list(token))
 */
export const tourQueries = {
  list: (token?: string) =>
    queryOptions({
      queryKey: tourKeys.list(),
      queryFn: () => fetchTours(token),
      staleTime: 5 * 60 * 1000, // 5 minutes — tours don't change frequently
    }),
};
