import { type Server } from "bun";
import { syncOrders } from "./order";

export const createHttpServer = (port: number): Server => {
  return Bun.serve({
    routes: {
      "/sync-orders": async () => {
        await syncOrders();

        return new Response("OK", { status: 200 });
      },
    },
    port,
  });
};
