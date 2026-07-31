import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "bun:test";

import { createServiceTemplateClient } from "@cirruscrmio/service-template-api-client";

import { prometheus } from "~/infrastructure/metrics";

import { type TestApp, startTestApp } from "../utils";

let client: ReturnType<typeof createServiceTemplateClient>;
let app: TestApp;

beforeAll(() => {
  app = startTestApp();
  client = createServiceTemplateClient({
    baseUrl: app.url,
    httpVersion: "1.1",
  });
});

beforeEach(() => {
  prometheus.register.resetMetrics();
});

afterAll(() => {
  app.stop();
});

describe("/metrics", () => {
  test("increases metrics", async () => {
    // Hit an RPC endpoint that generates metrics
    await client.sayHello({ message: "Foo" });

    const response = await fetch(`${app.url}/metrics`);

    expect(response.ok).toBeTruthy();
    expect(response.status).toBe(200);

    const content = await response.text();
    expect(content).toContain(
      "# TYPE cirrus_service_template_api_server_http_requests_total counter",
    );
    expect(content).toContain(
      `cirrus_service_template_api_server_http_requests_total{method="SayHello",status="Success"} 1`,
    );

    expect(content).toContain(
      "# TYPE cirrus_service_template_api_server_http_request_duration_seconds histogram",
    );
    expect(content).toContain(
      `cirrus_service_template_api_server_http_request_duration_seconds_count{method="SayHello",status="Success"} 1`,
    );
  });
});
