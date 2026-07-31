# cirrus-integration-example

This is a minimal, production-ready template for building Cirrus microservices
using [Bun](https://bun.sh/), TypeScript, and Docker.

## Creating a new service

To create a new service click the "Use this template" button in Github and give
the service a new name. We have the convention of naming services using
kebab-case with a `cirrus-` prefix.

Clone down the repository locally and run `./scripts/bootstrap.sh` where you
enter the service name. After the script executed successfully you are ready to
go.

Before hacking away at the new service, outline its functions in
`./docs/design-doc.md` for future reference.

## Tech Stack

- [**Bun**](https://bun.sh) — Fast runtime and package manager
- [**TypeScript**](https://www.typescriptlang.org/) — Strict types for safe
  development
- [**Zod**](https://zod.dev/) — Schema validation for config and responses
- [**Winston**](https://github.com/winstonjs/winston) — Structured logging
- [**Docker**](https://www.docker.com/) — Containerized deployment

## Project Structure

```sh
├── bun.lock
├── charts
│   └── cirrus-integration-example
├── Dockerfile
├── package.json
├── README.md
├── apps
│   └── server
└── tsconfig.json
```
