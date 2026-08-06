import {
  getGraphQLClient,
  type CreateAccountMutationVariables,
  type EditAccountMutationVariables,
} from "~/graphql";

/** Looks up a single account by its externalKey. Returns `undefined` if the
 * account has not been synced into Cirrus yet.
 *
 * The externalKey is unique per external record, so a lookup returns at most
 * one account and we only need to read the first page of results. */
export const findAccountByExternalKey = async (externalKey: string) => {
  const client = await getGraphQLClient();

  const { accounts } = await client.findAccountByExternalKey({ externalKey });

  const [account] = (accounts?.edges ?? [])
    .map((edge) => edge?.node)
    .filter((node) => node?.externalKey === externalKey);

  return account ?? undefined;
};

export const createAccount = async (input: CreateAccountMutationVariables) => {
  const client = await getGraphQLClient();

  const { createAccount } = await client.createAccount(input);

  return createAccount ?? undefined;
};

export const editAccount = async (input: EditAccountMutationVariables) => {
  const client = await getGraphQLClient();

  const { editAccount } = await client.editAccount(input);

  return editAccount ?? undefined;
};
