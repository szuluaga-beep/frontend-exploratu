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
  client: {
    // Add client-side environment variables here
    // Example: NEXT_PUBLIC_API_URL: z.string().url(),
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
