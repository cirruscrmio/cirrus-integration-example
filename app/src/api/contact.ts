import {
  getGraphQLClient,
  type CreateContactMutationVariables,
  type EditContactMutationVariables,
} from "~/graphql";

/** Lists the active contacts belonging to an account. Used to check whether a
 * contact has already been synced (by matching on externalKey). */
export const findContacts = async (accountId: number) => {
  const client = await getGraphQLClient();

  const { contacts } = await client.findContacts({ accountId });

  return (contacts?.edges ?? [])
    .map((edge) => edge?.node)
    .filter((node) => Boolean(node))
    .map((node) => node!);
};

export const createContact = async (input: CreateContactMutationVariables) => {
  const client = await getGraphQLClient();

  const { createContact } = await client.createContact(input);

  return createContact ?? undefined;
};

export const editContact = async (input: EditContactMutationVariables) => {
  const client = await getGraphQLClient();

  const { editContact } = await client.editContact(input);

  return editContact ?? undefined;
};
