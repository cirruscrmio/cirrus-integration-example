import { afterAll, beforeAll, describe, expect, test } from "bun:test";

import { createServiceTemplateClient } from "@cirruscrmio/service-template-api-client";

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

afterAll(() => {
  app.stop();
});

describe("sayHello", () => {
  test("returns message prefixed with 'You said'", async () => {
    const response = await client.sayHello({ message: "Foo" });
    expect(response.message).toBe("You said Foo");
  });

  test("returns validation error on empty message", async () => {
    await expect(() => client.sayHello({ message: "" })).toThrowError(
      "expected string to have >=1 characters",
    );
  });
});
