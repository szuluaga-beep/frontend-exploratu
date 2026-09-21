import type { CreateTourInput } from "@/lib/schemas/tour.schema";
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

/**
 * Creates a new tour. Requires a valid Bearer token (authenticated users only).
 *
 * @param data  - Tour payload matching the backend schema
 * @param token - Bearer token from the current session
 */
export async function createTour(data: CreateTourInput, token: string): Promise<Tour> {
  const api = createApiClient(token);
  const response = await api.post<Tour>("/api/tours", data);

  

  return response.data;
}
