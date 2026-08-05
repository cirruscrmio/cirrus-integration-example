import { getGraphQLClient, type AccountsFilterInput } from "~/graphql";

export const listAccounts = async (filter?: AccountsFilterInput) => {
  const client = await getGraphQLClient();

  return await client.listAccounts({
    filter,
  });
};
