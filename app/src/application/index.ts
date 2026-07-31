import { type Server } from "bun";

export const createHttpServer = (port: number): Server => {
  return Bun.serve({ routes: {}, port });
};
