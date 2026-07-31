import { TaskResult } from "@cirruscrmio/common";

import { type FooPort, fooErrors } from "~/application/ports";

export const createFooAdapater = (): FooPort => {
  return {
    fooTheBar: (message) =>
      TaskResult.fromTask(
        async () => `You said ${message}`,
        (cause) => fooErrors.FOO_ERROR("Failed to foo the bar", { cause }),
      ),
  };
};
