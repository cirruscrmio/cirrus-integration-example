import type { ConnectNodeAdapterOptions } from "@connectrpc/connect-node";

import { HelloService } from "@cirruscrmio/service-template-api-client";

import { createHelloService } from "./services";
import type { HelloServiceDeps } from "./services/HelloService/HelloService.deps";

export const createConnectRpcRouter =
  (deps: HelloServiceDeps): ConnectNodeAdapterOptions["routes"] =>
  (router) => {
    router.service(HelloService, createHelloService(deps));
  };
