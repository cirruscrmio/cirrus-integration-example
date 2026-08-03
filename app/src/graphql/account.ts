import { getGraphQLClient } from "./client";

interface AccountListFilter {
  externalKey: string;
}

export const listAccounts = async (filters?: AccountListFilter) => {
  const client = await getGraphQLClient();

  return await client.listAccounts({
    filter: {
      externalKey: filters?.externalKey,
    },
  });
};
