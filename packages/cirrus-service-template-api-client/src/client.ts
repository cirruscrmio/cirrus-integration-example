import { createClient } from "@connectrpc/connect";
import {
  createConnectTransport,
  type ConnectTransportOptions,
} from "@connectrpc/connect-node";

import { HelloService } from "@cirruscrmio/service-template-api-proto";

export type ServiceTemplateApiClientOptions = ConnectTransportOptions;

export function createServiceTemplateClient(
  options: ServiceTemplateApiClientOptions,
) {
  const transport = createConnectTransport({
    ...options,
  });

  return { ...createClient(HelloService, transport) };
}

export type ServiceTemplateClient = ReturnType<
  typeof createServiceTemplateClient
>;
