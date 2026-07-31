import { connectNodeAdapter } from "@connectrpc/connect-node";
import type { IncomingMessage, ServerResponse } from "node:http";

interface CreateHttpRouterProps {
  getMetrics: () => Promise<string>;
  rpcHandler: ReturnType<typeof connectNodeAdapter>;
}

export const createHttpHandler = ({
  getMetrics,
  rpcHandler,
}: CreateHttpRouterProps) => {
  return async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === "/healthz") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("OK");
      return;
    }

    if (req.url === "/metrics") {
      const metrics = await getMetrics();
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(metrics);
      return;
    }

    return rpcHandler(req, res);
  };
};
