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

  // Response interceptor: centralized error handling
  instance.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.warn("[API] Unauthorized (401) — token may be invalid or expired");
          return Promise.reject(new Error("Unauthorized: Please log in to continue."));
        }

        if (error.response?.status === 500) {
          console.error("[API] Internal server error (500)");
          return Promise.reject(new Error("Server error: Please try again later."));
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
}
