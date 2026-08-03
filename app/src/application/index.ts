import { type Server } from "bun";
import { syncOrders } from "./order";

export const createHttpServer = (port: number): Server => {
  return Bun.serve({
    routes: {
      "/healthz": new Response("OK", { status: 200 }),
      "/sync-orders": async () => {
        await syncOrders();

        return new Response("OK", { status: 200 });
      },
    },
    port,
  });
};
