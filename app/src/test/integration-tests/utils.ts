import { startApp } from "~/app";

// A high level port likely not used for other things
/* eslint-disable-next-line unicorn/numeric-separators-style */
const PORT = 51635;

export interface TestApp {
  stop: () => void;
  url: string;
}

export const startTestApp = (): TestApp => {
  const app = startApp({ port: PORT });
  const url = `http://localhost:${PORT}`;

  return { stop: () => app.stop(), url };
};
