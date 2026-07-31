/**
 * Creates a timer that returns the duration in milliseconds.
 *
 * @example
 * const timer = createTimer();
 * await doStuff();
 * const { durationInMs } = timer.stop();
 */
export const createTimer = () => {
  const start = Bun.nanoseconds();

  return {
    stop: () => {
      const end = Bun.nanoseconds();
      const durationInMs = (end - start) / 1e6;
      return { durationInMs };
    },
  };
};
