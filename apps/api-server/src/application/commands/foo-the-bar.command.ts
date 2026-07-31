import { z } from "zod";

export const fooTheBarCommandSchema = z.object({
  message: z.string().min(1),
});

export type FooTheBarCommand = z.infer<typeof fooTheBarCommandSchema>;
