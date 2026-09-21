import type { City } from "@/types/cities";

import { createApiClient } from "./http-client";

/**
 * Fetches the list of cities from the backend API.
 *
 * @param token - Optional Bearer token for authorization validations.
 */
export async function fetchCities(token?: string): Promise<City[]> {
  const api = createApiClient(token);
  const response = await api.get<City[]>("/api/cities");

  return response.data;
}
