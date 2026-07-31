import { Err, TaskResult } from "@cirruscrmio/common";

export const fooErrors = Err.create("FOO_ERROR");

export type FooError = Err.Infer<typeof fooErrors>;

export interface FooPort {
  /** Foos the bar */
  fooTheBar: (message: string) => TaskResult.TaskResult<string, FooError>;
}
