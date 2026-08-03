import type { AccountsFilterInput } from "~/gql/graphql";
import { getGraphQLClient } from "~/graphql/client";

export const listAccounts = async (filter?: AccountsFilterInput) => {
  const client = await getGraphQLClient();

  return await client.listAccounts({
    filter,
  });
};
