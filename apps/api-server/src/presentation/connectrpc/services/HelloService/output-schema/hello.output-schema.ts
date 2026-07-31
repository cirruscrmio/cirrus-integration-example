import { z } from "zod";

export const helloOutputSchema = z.object({
  message: z.string(),
});
