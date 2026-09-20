import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    // Add server-side environment variables here
    // Example: DATABASE_URL: z.string().url(),
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
