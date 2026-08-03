import { z } from "zod";

// Define required environment variables here
export const configSchema = z.object({
  CIRRUS_AUTH_CLIENT_ID: z.string().min(1),
  CIRRUS_AUTH_CLIENT_SECRET: z.string().min(1),

  // Endpoint to Cirrus OAuth where we can exchange credentials
  // for an auth token
  CIRRUS_OAUTH_URL: z.url().default("https://account.cirruscrm.io/oauth/token"),

  // Endpoint to Cirrus GraphQL API
  CIRRUS_GRAPHQL_URL: z.url().default("https://api.cirruscrm.io/graphql"),

  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),

  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().default(3000),
});

// Parse and validate the current process.env
// Will throw if any required env vars are missing or invalid
const config = configSchema.parse(process.env);

export default config;
