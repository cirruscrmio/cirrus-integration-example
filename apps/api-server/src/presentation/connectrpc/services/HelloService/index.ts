import type { ServiceImpl } from "@connectrpc/connect";

import type { HelloService } from "@cirruscrmio/service-template-api-client";

import type { HelloServiceDeps } from "./HelloService.deps";
import { sayHello } from "./methods";

export const createHelloService = (
  deps: HelloServiceDeps,
): ServiceImpl<typeof HelloService> => {
  return {
    sayHello: sayHello(deps),
  };
};
