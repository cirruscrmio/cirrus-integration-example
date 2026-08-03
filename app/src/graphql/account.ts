import { gql } from "graphql-request";
import { getGraphQLClient } from "./client";

const document = gql`
  {
    accounts {
      edges {
        node {
          name
        }
      }
    }
  }
`;

export const listAccounts = async () => {
  const client = await getGraphQLClient();
  const result = await client.request(document);
  return result;
};
