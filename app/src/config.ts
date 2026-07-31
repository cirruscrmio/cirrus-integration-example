import { z } from "zod";

export const SERVICE_NAME = "cirrus-integration-example-api-server";

// Define required environment variables here
export const configSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  PORT: z.coerce.number().default(3000),
});

// Parse and validate the current process.env
// Will throw if any required env vars are missing or invalid
const config = configSchema.parse(process.env);

export default config;
