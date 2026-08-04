# cirrus-integration-example

This is an example on how an external system (such as an ERP) can be synced into
Cirrus.

## Getting Started

This is just a template and how it integrates with your external system is up to
you.

### Setting Up Auth

To run it you will need the client credentials as outlined in
[src/config.ts](./src/config.ts).

## Development

### GraphQL and Codegen

This template uses GraphQL to interact with the Cirrus API. GraphQL queries are
defined in [app/src/graphql/queries.graphql](./app/src/graphql/queries.graphql).

We use `graphql-codegen` (configured in [app/codegen.ts](./app/codegen.ts)) to
automatically generate TypeScript types from these GraphQL queries and the
Cirrus API schema. This ensures type-safety and simplifies data fetching. The
generated code is located in [app/src/gql/graphql.ts](./app/src/gql/graphql.ts).
This service uses `graphql-request` to execute the GraphQL operations.

If you need to make changes in the GraphQL queries then update `queries.graphql`
and make sure to run `bun run codegen` afterwards.
