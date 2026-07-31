import type { FooPort } from "~/application/ports/foo.port";

export interface HelloServiceDeps {
  foo: FooPort;
}
