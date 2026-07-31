import client from "prom-client";

import { SERVICE_NAME } from "~/config";

// This sets up the metrics exposed to Prometheus
// Metrics should be named as `cirrus_my_service_metric_name`

const METRICS_SERVICE_NAME = SERVICE_NAME.replaceAll("-", "_");

export const httpRequestCounter = new client.Counter({
  name: `${METRICS_SERVICE_NAME}_http_requests_total`,
  help: "Total number of HTTP requests",
  labelNames: ["method", "status"] as const,
});

export const httpRequestDuration = new client.Histogram({
  name: `${METRICS_SERVICE_NAME}_http_request_duration_seconds`,
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "status"] as const,
});

export const register = new client.Registry();

// Metrics registered here will be automatically exposed in the app
register.registerMetric(httpRequestCounter);
register.registerMetric(httpRequestDuration);
