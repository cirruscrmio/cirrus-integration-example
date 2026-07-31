import type { MethodImpl } from "@connectrpc/connect";

import { TaskResult } from "@cirruscrmio/common";
import type { HelloService } from "@cirruscrmio/service-template-api-client";

import { fooTheBar } from "~/application/use-cases";

import type { HelloServiceDeps } from "../HelloService.deps";
import { helloOutputSchema } from "../output-schema";

export const sayHello =
  (deps: HelloServiceDeps): MethodImpl<typeof HelloService.method.sayHello> =>
  async (req) => {
    const message = req.message;

    const result = await TaskResult.unwrapOrThrow(fooTheBar(deps)({ message }));

    return helloOutputSchema.parse({ message: result });
  };
