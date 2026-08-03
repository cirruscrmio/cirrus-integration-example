import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.cirruscrm.io/graphql",
  documents: "src/graphql/queries.graphql",
  generates: {
    "src/gql/graphql.ts": {
      // Generates a SDK that can be used in GraphQL client
      // plugins: ["typescript-graphql-request"],
      plugins: [
        // "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],

    config: {
        enumsAsTypes: true,
        futureProofEnums: true,
      },
    },
  },
};

export default config;
