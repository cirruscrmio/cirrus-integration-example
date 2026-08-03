import { GraphQLClient } from "graphql-request";
import config from "~/config";
import { getToken } from "./auth";

export const getGraphQLClient = async (): Promise<GraphQLClient> => {
  const token = await getToken();

  return new GraphQLClient(config.CIRRUS_GRAPHQL_URL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
