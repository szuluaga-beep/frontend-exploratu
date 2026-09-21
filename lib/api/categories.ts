import type { Category } from "@/types/categories";

import { createApiClient } from "./http-client";

/**
 * Fetches the list of categories from the backend API.
 *
 * @param token - Optional Bearer token for authorization validations.
 */
export async function fetchCategories(token?: string): Promise<Category[]> {
  const api = createApiClient(token);
  const response = await api.get<Category[]>("/api/categories");

  return response.data;
}
