import { startApp } from "./app";

const port = Number(process.env.PORT || 3000);
startApp({ port });
