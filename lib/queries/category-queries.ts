import { queryOptions } from "@tanstack/react-query";

import { fetchCategories } from "@/lib/api/categories";

export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  list: () => [...categoryKeys.lists()] as const,
} as const;

export const categoryQueries = {
  list: (token?: string) =>
    queryOptions({
      queryKey: categoryKeys.list(),
      queryFn: () => fetchCategories(token),
      staleTime: 10 * 60 * 1000, // 10 minutes — categories are mostly static
    }),
};
