import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    // Add server-side environment variables here
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string(),
    NODE_ENV: z.enum(["development", "production"]),
    BETTER_AUTH_URL: z.url(),
    BACKEND_URL: z.url(),
  },
  client: {},
  experimental__runtimeEnv: {},
});
