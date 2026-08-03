import { gql } from "graphql-request";
import { getGraphQLClient } from "./client";

const document = gql`
  query listAccounts($filter: AccountsFilterInput) {
    accounts(filter: $filter) {
      edges {
        node {
          name
          externalId
        }
      }
    }
  }
`;

interface AccountListFilter {
  externalIds: string[];
}

interface ListAccountsVariables {
  filter?: {
    externalIds?: string[];
  };
}

export const listAccounts = async (filters?: AccountListFilter) => {
  const client = await getGraphQLClient();

  const variables: ListAccountsVariables = {};
  if (filters?.externalIds) {
    variables.filter = { externalIds: filters.externalIds };
  }

  const result = await client.request(document, variables);
  return result;
};
