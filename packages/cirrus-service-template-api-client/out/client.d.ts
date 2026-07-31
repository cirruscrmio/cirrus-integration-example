import { type ConnectTransportOptions } from "@connectrpc/connect-node";
export type ServiceTemplateApiClientOptions = ConnectTransportOptions;
export declare function createServiceTemplateClient(options: ServiceTemplateApiClientOptions): {
    sayHello: (request: import("@cirruscrmio/service-template-api-proto").SayHelloRequest | {
        readonly $typeName?: undefined;
        message?: string | undefined;
    }, options?: import("@connectrpc/connect").CallOptions) => Promise<import("@cirruscrmio/service-template-api-proto").SayHelloResponse>;
};
export type ServiceTemplateClient = ReturnType<typeof createServiceTemplateClient>;
