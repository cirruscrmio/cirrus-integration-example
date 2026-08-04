// This file configures GraphQL Codegen. It generates TypeScript types and a GraphQL SDK
// based on the GraphQL schema and queries, which are then used by the application's GraphQL client.

import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.cirruscrm.io/graphql",
  documents: "src/**/*.graphql",
  generates: {
    "src/gql/graphql.ts": {
      // Generates a SDK that can be used in GraphQL client
      plugins: ["typescript-operations", "typescript-graphql-request"],
    },
  },
};

export default config;
