import { Code, ConnectError, type Interceptor } from "@connectrpc/connect";

import { prometheus } from "~/infrastructure/metrics";
import { createTimer } from "~/utils";

const connectRpcMetricsInterceptor: Interceptor = (next) => async (req) => {
  const timer = createTimer();

  let status = "Success";

  try {
    return await next(req);
  } catch (error) {
    status = Code.Internal.toString();

    if (error instanceof ConnectError) {
      status = Code[error.code].toString();
    }

    throw error;
  } finally {
    const { durationInMs } = timer.stop();

    const method = req.method.name;

    prometheus.httpRequestCounter.inc({ method, status });
    prometheus.httpRequestDuration.observe(
      { method, status },
      durationInMs / 1000,
    );
  }
};

export const createConnectRpcMetricsInterceptor = () =>
  connectRpcMetricsInterceptor;
