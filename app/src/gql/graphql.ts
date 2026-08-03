/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { GraphQLClient, type RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type AccountActivitiesFilterInput = {
  closed?: number | null | undefined;
  typeId?: number | null | undefined;
  userId?: number | null | undefined;
};

export type AccountSorting =
  | 'NAME_ASC'
  | 'NAME_DESC'
  | 'NUMBER_ASC'
  | 'NUMBER_DESC'
  | 'POSTALADDRESS_EVEN_ASC'
  | 'POSTALADDRESS_EVEN_DESC'
  | 'POSTALADDRESS_NUMBER_ASC'
  | 'POSTALADDRESS_NUMBER_DESC'
  | 'POSTALADDRESS_ODD_ASC'
  | 'POSTALADDRESS_ODD_DESC'
  | 'USERID_ASC'
  | 'USERID_DESC'
  | '%future added value';

export type AccountsFilterInput = {
  activities?: AccountActivitiesFilterInput | null | undefined;
  alternateUserId?: number | null | undefined;
  alternateUserIds?: string | null | undefined;
  distance?: string | null | undefined;
  dynamicFields?: DynamicFieldFiltersInput | null | undefined;
  externalKey?: string | null | undefined;
  followedBy?: number | null | undefined;
  fullText?: string | null | undefined;
  missionId?: string | number | null | undefined;
  missionResult?: number | null | undefined;
  nearTo?: string | null | undefined;
  postal_street?: string | null | undefined;
  sort?: AccountSorting | null | undefined;
  typeId?: number | null | undefined;
  userId?: number | null | undefined;
  userIds?: string | null | undefined;
};

export type DynamicFieldFilterInput = {
  field: string | number;
  filter: string;
};

export type DynamicFieldFiltersInput = {
  filters?: Array<DynamicFieldFilterInput> | null | undefined;
};

export type ListAccountsQueryVariables = Exact<{
  filter?: AccountsFilterInput | null | undefined;
}>;


export type ListAccountsQuery = { accounts: { edges: Array<{ node: { name: string | null, externalKey: string | null } | null } | null> | null } | null };


export const ListAccountsDocument = gql`
    query listAccounts($filter: AccountsFilterInput) {
  accounts(filter: $filter) {
    edges {
      node {
        name
        externalKey
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    listAccounts(variables?: ListAccountsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ListAccountsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ListAccountsQuery>({ document: ListAccountsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'listAccounts', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;