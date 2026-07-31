import { TaskResult, pipe } from "@cirruscrmio/common";

import {
  type FooTheBarCommand,
  fooTheBarCommandSchema,
} from "~/application/commands";

import type { FooTheBarDeps } from "./foo-the-bar.deps";

export const fooTheBar =
  (deps: FooTheBarDeps) => (command: FooTheBarCommand) => {
    return pipe(
      // Validate command
      TaskResult.fromResult(fooTheBarCommandSchema.safeParse(command)),

      // Extract message from command
      TaskResult.map(({ message }) => message),

      // Invoke adapter
      TaskResult.flatMap((message) => deps.foo.fooTheBar(message)),
    );
  };
