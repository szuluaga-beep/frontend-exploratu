import { env } from "@/app/env";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

const database = new Pool({
  connectionString: env.DATABASE_URL,
});

export const auth = betterAuth({
  database: database,
  emailAndPassword: { enabled: true, autoSignIn: false },
  plugins: [nextCookies()],
});
