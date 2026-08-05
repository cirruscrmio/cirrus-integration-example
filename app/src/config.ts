import { z } from "zod";

// Define required environment variables here
export const configSchema = z.object({
  // Client credentials which can be requested from Cirrus
  CIRRUS_AUTH_CLIENT_ID: z.string().min(1),
  CIRRUS_AUTH_CLIENT_SECRET: z.string().min(1),

  // Endpoint to Cirrus OAuth where we can exchange credentials
  // for an auth token
  CIRRUS_OAUTH_URL: z.url().default("https://account.cirruscrm.io/oauth/token"),

  // Endpoint to Cirrus GraphQL API
  CIRRUS_GRAPHQL_URL: z.url().default("https://api.cirruscrm.io/graphql"),

  // Cirrus requires an account type and an owning user when creating an
  // account. These are Cirrus-side concepts that usually don't exist in the
  // external system, so we configure sensible defaults to fall back on.
  CIRRUS_DEFAULT_ACCOUNT_TYPE_ID: z.coerce.number().int().positive(),
  CIRRUS_DEFAULT_USER_ID: z.coerce.number().int().positive(),

  LOG_LEVEL: z
    .enum(["verbose", "debug", "info", "warn", "error"])
    .default("info"),

  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

// Parse and validate the current process.env
// Will throw if any required env vars are missing or invalid
const config = configSchema.parse(process.env);

export default config;
