import { GraphQLClient } from "graphql-request";

import config from "~/config";

import { getToken } from "./auth";
import { getSdk } from "./generated";

/** Creates a GraphQL API client with authentication */
export const getGraphQLClient = async () => {
  const token = await getToken();

  const client = new GraphQLClient(config.CIRRUS_GRAPHQL_URL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  // Wrap client in generated SDK to allow
  // executing methods directly on client, such as `await client.findAccounts()`
  return getSdk(client);
};
