import { afterAll, beforeAll, describe, expect, test } from "bun:test";

import { type TestApp, startTestApp } from "../utils";

let app: TestApp;

beforeAll(() => {
  app = startTestApp();
});

afterAll(() => {
  app.stop();
});

describe("/healthz", () => {
  test("returns 200", async () => {
    const response = await fetch(`${app.url}/healthz`);

    expect(response.ok).toBeTruthy();
    expect(response.status).toBe(200);
  });
});
