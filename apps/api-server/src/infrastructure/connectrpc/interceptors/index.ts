import type { Interceptor } from "@connectrpc/connect";

import type { LoggerPort } from "~/application/ports";

import { createConnectRpcLoggingInterceptor } from "./logging.interceptor";
import { createConnectRpcMetricsInterceptor } from "./metrics.interceptor";

interface ConnectRpcInterceptorsDeps {
  logger: LoggerPort;
}

export const createConnectRpcInterceptors = (
  deps: ConnectRpcInterceptorsDeps,
): Interceptor[] => [
  createConnectRpcMetricsInterceptor(),
  createConnectRpcLoggingInterceptor(deps),
];
