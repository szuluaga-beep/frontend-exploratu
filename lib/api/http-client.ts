import axios from "axios";

import { env } from "@/app/env";

/**
 * Creates a new axios instance per call — never a singleton.
 * This is intentional: on the server, a singleton would leak tokens between requests/users.
 *
 * @param token - Optional Bearer token for Authorization header
 */
export function createApiClient(token?: string) {
  const instance = axios.create({
    baseURL: env.BACKEND_URL,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  });

  // Request interceptor: inject Authorization header when token is provided
  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: unknown) => Promise.reject(error),
  );

  // Response interceptor: log errors centrally but always re-throw the
  // original AxiosError so callers can inspect response.data and status
  instance.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401) {
          console.warn("[API] Unauthorized (401) — token may be invalid or expired");
        } else if (status === 500) {
          console.error("[API] Internal server error (500)", error.response?.data);
        } else if (status != null) {
          console.warn(`[API] Error ${status}`, error.response?.data);
        }
      }

      // Always re-throw the original error so callers get the full AxiosError
      // (including response.data with the backend message)
      return Promise.reject(error);
    },
  );

  return instance;
}
