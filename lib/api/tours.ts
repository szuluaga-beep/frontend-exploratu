import type { Tour } from "@/types/tours";

import { createApiClient } from "./http-client";

/**
 * Fetches the list of tours from the backend API.
 *
 * @param token - Optional Bearer token. Pass the session token to
 *                allow the backend to run authorization validations.
 */
export async function fetchTours(token?: string): Promise<Tour[]> {
  const api = createApiClient(token);
  const response = await api.get<Tour[]>("/api/tours");

  return response.data;
}
