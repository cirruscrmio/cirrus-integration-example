import { z } from "zod";

// Define required environment variables here
export const configSchema = z.object({
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
