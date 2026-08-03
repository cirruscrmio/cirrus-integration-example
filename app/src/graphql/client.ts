import { GraphQLClient } from "graphql-request";

import config from "~/config";
import { getSdk } from "~/gql/graphql";
import { getToken } from "./auth";

/** Creates a GraphQL API client with authentication */
export const getGraphQLClient = async () => {
  const token = await getToken();

  const client = new GraphQLClient(config.CIRRUS_GRAPHQL_URL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  // Wrap client in generated SDK to allow
  // executing methods directly on client, such as `await client.listAccounts()`
  return getSdk(client);
};
