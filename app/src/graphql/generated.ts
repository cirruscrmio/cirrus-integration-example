/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
import { GraphQLClient, type RequestOptions } from "graphql-request";
import gql from "graphql-tag";
type GraphQLClientRequestHeaders = RequestOptions["requestHeaders"];
export type ArticleInput = {
  accountId?: string | number | null | undefined;
  active?: number | null | undefined;
  area?: number | null | undefined;
  brandId?: string | number | null | undefined;
  budgetGroupId?: string | number | null | undefined;
  businessAreaId?: string | number | null | undefined;
  buyprice?: number | null | undefined;
  commission?: number | null | undefined;
  description: string;
  discount?: number | null | undefined;
  discountGroupId?: string | number | null | undefined;
  externalKey?: string | null | undefined;
  groupId?: string | number | null | undefined;
  imageUrl?: string | null | undefined;
  inCampaign?: number | null | undefined;
  materialId?: string | number | null | undefined;
  name: string;
  number?: string | null | undefined;
  presentation?: string | null | undefined;
  price: number;
  serviceLevelId?: string | number | null | undefined;
  sortOrder?: number | null | undefined;
  stockBalance?: number | null | undefined;
  stockBalanceWarningThreshold?: number | null | undefined;
  supplierArticleNumber?: string | null | undefined;
  supplierName?: string | null | undefined;
  tags?: Array<string | number> | null | undefined;
  unitId?: string | number | null | undefined;
  url1?: string | null | undefined;
  url2?: string | null | undefined;
  vat: number;
  volume?: number | null | undefined;
  volumeGroupId?: string | number | null | undefined;
  warehouseId?: string | number | null | undefined;
  warehouseStatusId?: string | number | null | undefined;
};

export type CreateArticleUnitInput = {
  externalKey?: string | null | undefined;
  name: string;
};

export type CreateDeliveryTermInput = {
  default?: number | null | undefined;
  externalKey?: string | null | undefined;
  name: string;
};

export type CreateDeliveryTypeInput = {
  default?: number | null | undefined;
  name: string;
};

export type CreateOrderInput = {
  order?: OrderInput | null | undefined;
};

export type CreateOrderStatusInput = {
  default?: number | null | undefined;
  name: string;
  step: number;
};

export type CreateOrderTypeInput = {
  default?: number | null | undefined;
  name: string;
  sortorder: number;
};

export type CreatePaymentTermInput = {
  days: number;
  default?: number | null | undefined;
  externalKey?: string | null | undefined;
  name: string;
};

export type DateInput = {
  iso?: string | null | undefined;
  value?: DateValues | null | undefined;
};

export type DateValues = {
  day?: number;
  month?: Month | null | undefined;
  monthNumber?: number | null | undefined;
  year: number;
};

/** Month */
export type Month =
  | "APR"
  | "AUG"
  | "DEC"
  | "FEB"
  | "JAN"
  | "JUL"
  | "JUN"
  | "MAR"
  | "MAY"
  | "NOV"
  | "OCT"
  | "SEP";

export type OrderCurrencyInput = {
  code?: string | null | undefined;
  rate?: number | null | undefined;
};

export type OrderDeliveryInput = {
  city?: string | null | undefined;
  date?: DateInput | null | undefined;
  name?: string | null | undefined;
  street?: string | null | undefined;
  termId: string | number;
  typeId: string | number;
  zip?: string | null | undefined;
};

export type OrderInput = {
  accountId: string | number;
  alternateId?: string | null | undefined;
  contactId: string | number;
  currency?: OrderCurrencyInput | null | undefined;
  delivery: OrderDeliveryInput;
  externalComment?: string | null | undefined;
  externalKey?: string | null | undefined;
  extraCode?: string | null | undefined;
  internalComment?: string | null | undefined;
  invoice?: OrderInvoiceInput | null | undefined;
  marking?: string | null | undefined;
  opportunityId?: string | number | null | undefined;
  paymentTermId: string | number;
  placeDate: DateInput;
  price?: number | null | undefined;
  referenceCode?: string | null | undefined;
  rows?: Array<OrderRowInput> | null | undefined;
  statusId: string | number;
  tags?: Array<string | number> | null | undefined;
  typeId: string | number;
  userId: string | number;
};

export type OrderInvoiceInput = {
  account?: string | null | undefined;
  city?: string | null | undefined;
  country?: string | null | undefined;
  date?: DateInput | null | undefined;
  name?: string | null | undefined;
  number?: string | null | undefined;
  street?: string | null | undefined;
  zip?: string | null | undefined;
};

export type OrderRowInput = {
  accountId?: string | number | null | undefined;
  alternativeValue?: number | null | undefined;
  articleId: string | number;
  articleUnitId: string | number;
  currency?: OrderCurrencyInput | null | undefined;
  deleted?: number | null | undefined;
  discountAmount?: number | null | undefined;
  discountPercent?: number | null | undefined;
  discountSpecial?: number | null | undefined;
  externalKey?: string | null | undefined;
  id?: string | number | null | undefined;
  noprint?: number | null | undefined;
  opportunityId?: string | number | null | undefined;
  price?: number | null | undefined;
  priceListId?: string | number | null | undefined;
  priceWarning?: number | null | undefined;
  quantity?: OrderRowQuantityInput | null | undefined;
  sortGroup?: string | number | null | undefined;
  sortOrder?: number | null | undefined;
  specification?: string | null | undefined;
  statisticsPrice?: number | null | undefined;
  tags?: Array<string | number> | null | undefined;
  totalAlternativeValue?: number | null | undefined;
  totalPriceStatistics?: number | null | undefined;
  userId?: string | number | null | undefined;
};

export type OrderRowQuantityInput = {
  delivered?: number | null | undefined;
  ordered?: number | null | undefined;
};

export type UpdateOrderInput = {
  id: string | number;
  order?: OrderInput | null | undefined;
};

export type EditArticleMutationVariables = Exact<{
  id: string | number;
  input: ArticleInput;
}>;

export type EditArticleMutation = {
  editArticle: { article: { id: string | null } | null } | null;
};

export type CreateArticleMutationVariables = Exact<{
  input: ArticleInput;
}>;

export type CreateArticleMutation = {
  createArticle: { article: { id: string | null } | null } | null;
};

export type CreatePaymentTermMutationVariables = Exact<{
  input: CreatePaymentTermInput;
}>;

export type CreatePaymentTermMutation = {
  createPaymentTerm: {
    paymentTerm: { id: string | null; name: string | null } | null;
  } | null;
};

export type CreateDeliveryTermMutationVariables = Exact<{
  input: CreateDeliveryTermInput;
}>;

export type CreateDeliveryTermMutation = {
  createDeliveryTerm: {
    deliveryTerm: { id: string; name: string } | null;
  } | null;
};

export type CreateDeliveryTypeMutationVariables = Exact<{
  input: CreateDeliveryTypeInput;
}>;

export type CreateDeliveryTypeMutation = {
  createDeliveryType: {
    deliveryType: { id: string; name: string } | null;
  } | null;
};

export type CreateOrderStatusMutationVariables = Exact<{
  input: CreateOrderStatusInput;
}>;

export type CreateOrderStatusMutation = {
  createOrderStatus: {
    orderStatus: { id: string; name: string } | null;
  } | null;
};

export type CreateOrderTypeMutationVariables = Exact<{
  input: CreateOrderTypeInput;
}>;

export type CreateOrderTypeMutation = {
  createOrderType: { orderType: { id: string; name: string } | null } | null;
};

export type CreateArticleUnitMutationVariables = Exact<{
  input: CreateArticleUnitInput;
}>;

export type CreateArticleUnitMutation = {
  createArticleUnit: {
    articleUnit: { id: string | null; name: string | null } | null;
  } | null;
};

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;

export type CreateOrderMutation = {
  createOrder: { order: { id: string } | null };
};

export type EditOrderMutationVariables = Exact<{
  input: UpdateOrderInput;
}>;

export type EditOrderMutation = {
  updateOrder: { order: { id: string } | null };
};

export type CreateAccountMutationVariables = Exact<{
  name: string;
  typeId: number;
  userId: number;
  number?: string | null | undefined;
  externalKey?: string | null | undefined;
}>;

export type CreateAccountMutation = {
  createAccount: {
    id: number | null;
    number: string | null;
    name: string | null;
    externalKey: string | null;
    userId: number | null;
  } | null;
};

export type EditAccountMutationVariables = Exact<{
  id: number;
  name: string;
  typeId: number;
  userId?: number | null | undefined;
  number?: string | null | undefined;
  externalKey?: string | null | undefined;
}>;

export type EditAccountMutation = {
  editAccount: {
    id: number | null;
    number: string | null;
    name: string | null;
    externalKey: string | null;
    userId: number | null;
  } | null;
};

export type CreateContactMutationVariables = Exact<{
  accountId: number;
  firstName: string;
  lastName: string;
  externalKey: string;
}>;

export type CreateContactMutation = {
  createContact: { id: number | null } | null;
};

export type EditContactMutationVariables = Exact<{
  id: number;
  accountId: number;
  firstName: string;
  lastName: string;
  externalKey: string;
}>;

export type EditContactMutation = {
  editContact: {
    id: number | null;
    name: string | null;
    surname: string | null;
    title: string | null;
    active: boolean | null;
    externalKey: string | null;
  } | null;
};

export type WhoAmIQueryVariables = Exact<{ [key: string]: never }>;

export type WhoAmIQuery = { viewer: { fullName: string | null } | null };

export type ArticlesQueryVariables = Exact<{
  cursor?: string | null | undefined;
}>;

export type ArticlesQuery = {
  articles: {
    pageInfo: { endCursor: string | null; hasNextPage: boolean } | null;
    edges: Array<{
      node: {
        id: string | null;
        number: string | null;
        description: string | null;
        buyprice: number | null;
        price: number | null;
        name: string | null;
        active: number | null;
        externalKey: string | null;
        vat: number | null;
      } | null;
    } | null> | null;
  } | null;
};

export type FindArticleQueryVariables = Exact<{
  cursor?: string | null | undefined;
  articleNumber: string;
}>;

export type FindArticleQuery = {
  articles: {
    pageInfo: { endCursor: string | null; hasNextPage: boolean } | null;
    edges: Array<{
      node: {
        id: string | null;
        number: string | null;
        description: string | null;
        buyprice: number | null;
        price: number | null;
        name: string | null;
        active: number | null;
        externalKey: string | null;
        vat: number | null;
      } | null;
    } | null> | null;
  } | null;
};

export type ArticleFragment = {
  id: string | null;
  number: string | null;
  description: string | null;
  buyprice: number | null;
  price: number | null;
  name: string | null;
  active: number | null;
  externalKey: string | null;
  vat: number | null;
};

export type FindAccountsQueryVariables = Exact<{
  cursor?: string | null | undefined;
  accountNumber: string;
}>;

export type FindAccountsQuery = {
  accounts: {
    pageInfo: { endCursor: string | null; hasNextPage: boolean } | null;
    edges: Array<{
      node: {
        id: number | null;
        number: string | null;
        name: string | null;
        externalKey: string | null;
        userId: number | null;
      } | null;
    } | null> | null;
  } | null;
};

export type FindAccountByExternalKeyQueryVariables = Exact<{
  cursor?: string | null | undefined;
  externalKey: string;
}>;

export type FindAccountByExternalKeyQuery = {
  accounts: {
    pageInfo: { endCursor: string | null; hasNextPage: boolean } | null;
    edges: Array<{
      node: {
        id: number | null;
        number: string | null;
        name: string | null;
        externalKey: string | null;
        userId: number | null;
      } | null;
    } | null> | null;
  } | null;
};

export type AccountFragment = {
  id: number | null;
  number: string | null;
  name: string | null;
  externalKey: string | null;
  userId: number | null;
};

export type FindContactsQueryVariables = Exact<{
  cursor?: string | null | undefined;
  accountId: number;
}>;

export type FindContactsQuery = {
  contacts: {
    pageInfo: { endCursor: string | null; hasNextPage: boolean } | null;
    edges: Array<{
      node: {
        id: number | null;
        name: string | null;
        surname: string | null;
        title: string | null;
        active: boolean | null;
        externalKey: string | null;
      } | null;
    } | null> | null;
  } | null;
};

export type ContactFragment = {
  id: number | null;
  name: string | null;
  surname: string | null;
  title: string | null;
  active: boolean | null;
  externalKey: string | null;
};

export type FindAccountUserQueryVariables = Exact<{
  accountId?: number | null | undefined;
}>;

export type FindAccountUserQuery = {
  account: { userId: number | null; user: { id: number | null } | null } | null;
};

export type GetOrdersQueryVariables = Exact<{
  cursor?: string | null | undefined;
  externalKey: string;
}>;

export type GetOrdersQuery = {
  orders: {
    pageInfo: { endCursor: string | null; hasNextPage: boolean } | null;
    edges: Array<{
      node: {
        id: string;
        externalKey: string | null;
        alternateId: string | null;
        placeDate: { iso: string } | null;
        account: { id: number | null } | null;
        contact: { id: number | null } | null;
        rows: Array<{
          id: string;
          price: number | null;
          discountPercent: number | null;
          discountAmount: number | null;
          sortOrder: number | null;
          specification: string | null;
          deleted: number | null;
          article: { id: string | null } | null;
          articleUnit: { id: string | null; name: string | null } | null;
          quantity: { delivered: number | null };
        } | null> | null;
        paymentTerm: { id: string | null; name: string | null } | null;
        delivery: {
          term: { id: string; name: string } | null;
          type: { id: string } | null;
        };
        status: { id: string; name: string } | null;
        type: { id: string } | null;
        user: { id: number | null } | null;
      } | null;
    } | null> | null;
  } | null;
};

export type OrderRowFragment = {
  id: string;
  price: number | null;
  discountPercent: number | null;
  discountAmount: number | null;
  sortOrder: number | null;
  specification: string | null;
  deleted: number | null;
  article: { id: string | null } | null;
  articleUnit: { id: string | null; name: string | null } | null;
  quantity: { delivered: number | null };
};

export type OrderFragment = {
  id: string;
  externalKey: string | null;
  alternateId: string | null;
  placeDate: { iso: string } | null;
  account: { id: number | null } | null;
  contact: { id: number | null } | null;
  rows: Array<{
    id: string;
    price: number | null;
    discountPercent: number | null;
    discountAmount: number | null;
    sortOrder: number | null;
    specification: string | null;
    deleted: number | null;
    article: { id: string | null } | null;
    articleUnit: { id: string | null; name: string | null } | null;
    quantity: { delivered: number | null };
  } | null> | null;
  paymentTerm: { id: string | null; name: string | null } | null;
  delivery: {
    term: { id: string; name: string } | null;
    type: { id: string } | null;
  };
  status: { id: string; name: string } | null;
  type: { id: string } | null;
  user: { id: number | null } | null;
};

export type FindPaymentTermQueryVariables = Exact<{
  cursor?: string | null | undefined;
  name: string;
}>;

export type FindPaymentTermQuery = {
  paymentTerms: {
    pageInfo: { endCursor: string | null; hasNextPage: boolean } | null;
    edges: Array<{
      node: { id: string | null; name: string | null } | null;
    } | null> | null;
  } | null;
};

export type FindDeliveryTermQueryVariables = Exact<{
  cursor?: string | null | undefined;
  name: string;
}>;

export type FindDeliveryTermQuery = {
  deliveryTerms: {
    pageInfo: { endCursor: string | null; hasNextPage: boolean } | null;
    edges: Array<{ node: { id: string; name: string } | null } | null> | null;
  } | null;
};

export type FindDeliveryTypeQueryVariables = Exact<{
  cursor?: string | null | undefined;
  name: string;
}>;

export type FindDeliveryTypeQuery = {
  deliveryTypes: {
    pageInfo: { endCursor: string | null; hasNextPage: boolean } | null;
    edges: Array<{ node: { id: string; name: string } | null } | null> | null;
  } | null;
};

export type FindOrderTypesQueryVariables = Exact<{
  cursor?: string | null | undefined;
  name: string;
}>;

export type FindOrderTypesQuery = {
  orderTypes: {
    pageInfo: { endCursor: string | null; hasNextPage: boolean } | null;
    edges: Array<{ node: { id: string; name: string } | null } | null> | null;
  } | null;
};

export type FindOrderStatusesQueryVariables = Exact<{
  cursor?: string | null | undefined;
  name: string;
}>;

export type FindOrderStatusesQuery = {
  orderStatuses: {
    pageInfo: { endCursor: string | null; hasNextPage: boolean } | null;
    edges: Array<{ node: { id: string; name: string } | null } | null> | null;
  } | null;
};

export type FindArticleUnitsQueryVariables = Exact<{
  cursor?: string | null | undefined;
  name: string;
}>;

export type FindArticleUnitsQuery = {
  articleUnits: {
    pageInfo: { endCursor: string | null; hasNextPage: boolean } | null;
    edges: Array<{
      node: { id: string | null; name: string | null } | null;
    } | null> | null;
  } | null;
};

export type FindAnyArticleGroupQueryVariables = Exact<{ [key: string]: never }>;

export type FindAnyArticleGroupQuery = {
  articleGroups: {
    edges: Array<{ node: { id: string | null } | null } | null> | null;
  } | null;
};

export type FindOrderDefaultsQueryVariables = Exact<{ [key: string]: never }>;

export type FindOrderDefaultsQuery = {
  deliveryTypes: {
    edges: Array<{ node: { id: string } | null } | null> | null;
  } | null;
  deliveryTerms: {
    edges: Array<{ node: { id: string } | null } | null> | null;
  } | null;
  paymentTerms: {
    edges: Array<{ node: { id: string | null } | null } | null> | null;
  } | null;
  orderTypes: {
    edges: Array<{ node: { id: string } | null } | null> | null;
  } | null;
  orderStatuses: {
    edges: Array<{ node: { id: string } | null } | null> | null;
  } | null;
};

export const ArticleFragmentDoc = gql`
  fragment Article on Article {
    id
    number
    description
    buyprice
    price
    name
    active
    externalKey
    vat
  }
`;
export const AccountFragmentDoc = gql`
  fragment Account on Account {
    id
    number
    name
    externalKey
    userId
  }
`;
export const ContactFragmentDoc = gql`
  fragment Contact on Contact {
    id
    name
    surname
    title
    active
    externalKey
  }
`;
export const OrderRowFragmentDoc = gql`
  fragment OrderRow on OrderRow {
    id
    article {
      id
    }
    articleUnit {
      id
      name
    }
    quantity {
      delivered
    }
    price
    discountPercent
    discountAmount
    sortOrder
    specification
    deleted
  }
`;
export const OrderFragmentDoc = gql`
  fragment Order on Order {
    id
    placeDate {
      iso
    }
    externalKey
    alternateId
    account {
      id
    }
    contact {
      id
    }
    rows {
      ...OrderRow
    }
    paymentTerm {
      id
      name
    }
    delivery {
      term {
        id
        name
      }
      type {
        id
      }
    }
    status {
      id
      name
    }
    type {
      id
    }
    user {
      id
    }
  }
  ${OrderRowFragmentDoc}
`;
export const EditArticleDocument = gql`
  mutation editArticle($id: ID!, $input: ArticleInput!) {
    editArticle(id: $id, input: $input) {
      article {
        id
      }
    }
  }
`;
export const CreateArticleDocument = gql`
  mutation createArticle($input: ArticleInput!) {
    createArticle(input: $input) {
      article {
        id
      }
    }
  }
`;
export const CreatePaymentTermDocument = gql`
  mutation createPaymentTerm($input: CreatePaymentTermInput!) {
    createPaymentTerm(input: $input) {
      paymentTerm {
        id
        name
      }
    }
  }
`;
export const CreateDeliveryTermDocument = gql`
  mutation createDeliveryTerm($input: CreateDeliveryTermInput!) {
    createDeliveryTerm(input: $input) {
      deliveryTerm {
        id
        name
      }
    }
  }
`;
export const CreateDeliveryTypeDocument = gql`
  mutation createDeliveryType($input: CreateDeliveryTypeInput!) {
    createDeliveryType(input: $input) {
      deliveryType {
        id
        name
      }
    }
  }
`;
export const CreateOrderStatusDocument = gql`
  mutation createOrderStatus($input: CreateOrderStatusInput!) {
    createOrderStatus(input: $input) {
      orderStatus {
        id
        name
      }
    }
  }
`;
export const CreateOrderTypeDocument = gql`
  mutation createOrderType($input: CreateOrderTypeInput!) {
    createOrderType(input: $input) {
      orderType {
        id
        name
      }
    }
  }
`;
export const CreateArticleUnitDocument = gql`
  mutation createArticleUnit($input: CreateArticleUnitInput!) {
    createArticleUnit(input: $input) {
      articleUnit {
        id
        name
      }
    }
  }
`;
export const CreateOrderDocument = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      order {
        id
      }
    }
  }
`;
export const EditOrderDocument = gql`
  mutation editOrder($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      order {
        id
      }
    }
  }
`;
export const CreateAccountDocument = gql`
  mutation createAccount(
    $name: String!
    $typeId: Int!
    $userId: Int!
    $number: String
    $externalKey: String
  ) {
    createAccount(
      name: $name
      typeId: $typeId
      userId: $userId
      number: $number
      externalKey: $externalKey
    ) {
      ...Account
    }
  }
  ${AccountFragmentDoc}
`;
export const EditAccountDocument = gql`
  mutation editAccount(
    $id: Int!
    $name: String!
    $typeId: Int!
    $userId: Int
    $number: String
    $externalKey: String
  ) {
    editAccount(
      id: $id
      name: $name
      typeId: $typeId
      userId: $userId
      number: $number
      externalKey: $externalKey
    ) {
      ...Account
    }
  }
  ${AccountFragmentDoc}
`;
export const CreateContactDocument = gql`
  mutation createContact(
    $accountId: Int!
    $firstName: String!
    $lastName: String!
    $externalKey: String!
  ) {
    createContact(
      name: $firstName
      surname: $lastName
      accountId: $accountId
      externalKey: $externalKey
    ) {
      id
    }
  }
`;
export const EditContactDocument = gql`
  mutation editContact(
    $id: Int!
    $accountId: Int!
    $firstName: String!
    $lastName: String!
    $externalKey: String!
  ) {
    editContact(
      id: $id
      accountId: $accountId
      name: $firstName
      surname: $lastName
      externalKey: $externalKey
    ) {
      ...Contact
    }
  }
  ${ContactFragmentDoc}
`;
export const WhoAmIDocument = gql`
  query whoAmI {
    viewer {
      fullName
    }
  }
`;
export const ArticlesDocument = gql`
  query articles($cursor: String) {
    articles(after: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Article
        }
      }
    }
  }
  ${ArticleFragmentDoc}
`;
export const FindArticleDocument = gql`
  query findArticle($cursor: String, $articleNumber: String!) {
    articles(after: $cursor, filter: { fulltext: $articleNumber }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Article
        }
      }
    }
  }
  ${ArticleFragmentDoc}
`;
export const FindAccountsDocument = gql`
  query findAccounts($cursor: String, $accountNumber: String!) {
    accounts(after: $cursor, filter: { fullText: $accountNumber }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Account
        }
      }
    }
  }
  ${AccountFragmentDoc}
`;
export const FindAccountByExternalKeyDocument = gql`
  query findAccountByExternalKey($cursor: String, $externalKey: String!) {
    accounts(after: $cursor, filter: { externalKey: $externalKey }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Account
        }
      }
    }
  }
  ${AccountFragmentDoc}
`;
export const FindContactsDocument = gql`
  query findContacts($cursor: String, $accountId: Int!) {
    contacts(after: $cursor, filter: { active: 1, accountId: $accountId }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Contact
        }
      }
    }
  }
  ${ContactFragmentDoc}
`;
export const FindAccountUserDocument = gql`
  query findAccountUser($accountId: Int) {
    account(id: $accountId) {
      userId
      user {
        id
      }
    }
  }
`;
export const GetOrdersDocument = gql`
  query getOrders($cursor: String, $externalKey: String!) {
    orders(after: $cursor, filter: { externalKey: $externalKey }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Order
        }
      }
    }
  }
  ${OrderFragmentDoc}
`;
export const FindPaymentTermDocument = gql`
  query findPaymentTerm($cursor: String, $name: String!) {
    paymentTerms(after: $cursor, filter: { name: $name }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const FindDeliveryTermDocument = gql`
  query findDeliveryTerm($cursor: String, $name: String!) {
    deliveryTerms(after: $cursor, filter: { name: $name }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const FindDeliveryTypeDocument = gql`
  query findDeliveryType($cursor: String, $name: String!) {
    deliveryTypes(after: $cursor, filter: { name: $name }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const FindOrderTypesDocument = gql`
  query findOrderTypes($cursor: String, $name: String!) {
    orderTypes(after: $cursor, filter: { name: $name }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const FindOrderStatusesDocument = gql`
  query findOrderStatuses($cursor: String, $name: String!) {
    orderStatuses(after: $cursor, filter: { name: $name }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const FindArticleUnitsDocument = gql`
  query findArticleUnits($cursor: String, $name: String!) {
    articleUnits(after: $cursor, filter: { name: $name }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const FindAnyArticleGroupDocument = gql`
  query findAnyArticleGroup {
    articleGroups(filter: { sort: ID_ASC }) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
export const FindOrderDefaultsDocument = gql`
  query findOrderDefaults {
    deliveryTypes(filter: { default: 1 }) {
      edges {
        node {
          id
        }
      }
    }
    deliveryTerms(filter: { default: 1 }) {
      edges {
        node {
          id
        }
      }
    }
    paymentTerms(filter: { default: 1 }) {
      edges {
        node {
          id
        }
      }
    }
    orderTypes(filter: { default: 1 }) {
      edges {
        node {
          id
        }
      }
    }
    orderStatuses {
      edges {
        node {
          id
        }
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    editArticle(
      variables: EditArticleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<EditArticleMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditArticleMutation>({
            document: EditArticleDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "editArticle",
        "mutation",
        variables,
      );
    },
    createArticle(
      variables: CreateArticleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<CreateArticleMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateArticleMutation>({
            document: CreateArticleDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "createArticle",
        "mutation",
        variables,
      );
    },
    createPaymentTerm(
      variables: CreatePaymentTermMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<CreatePaymentTermMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePaymentTermMutation>({
            document: CreatePaymentTermDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "createPaymentTerm",
        "mutation",
        variables,
      );
    },
    createDeliveryTerm(
      variables: CreateDeliveryTermMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<CreateDeliveryTermMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateDeliveryTermMutation>({
            document: CreateDeliveryTermDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "createDeliveryTerm",
        "mutation",
        variables,
      );
    },
    createDeliveryType(
      variables: CreateDeliveryTypeMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<CreateDeliveryTypeMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateDeliveryTypeMutation>({
            document: CreateDeliveryTypeDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "createDeliveryType",
        "mutation",
        variables,
      );
    },
    createOrderStatus(
      variables: CreateOrderStatusMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<CreateOrderStatusMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateOrderStatusMutation>({
            document: CreateOrderStatusDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "createOrderStatus",
        "mutation",
        variables,
      );
    },
    createOrderType(
      variables: CreateOrderTypeMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<CreateOrderTypeMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateOrderTypeMutation>({
            document: CreateOrderTypeDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "createOrderType",
        "mutation",
        variables,
      );
    },
    createArticleUnit(
      variables: CreateArticleUnitMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<CreateArticleUnitMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateArticleUnitMutation>({
            document: CreateArticleUnitDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "createArticleUnit",
        "mutation",
        variables,
      );
    },
    createOrder(
      variables: CreateOrderMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<CreateOrderMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateOrderMutation>({
            document: CreateOrderDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "createOrder",
        "mutation",
        variables,
      );
    },
    editOrder(
      variables: EditOrderMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<EditOrderMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditOrderMutation>({
            document: EditOrderDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "editOrder",
        "mutation",
        variables,
      );
    },
    createAccount(
      variables: CreateAccountMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<CreateAccountMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateAccountMutation>({
            document: CreateAccountDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "createAccount",
        "mutation",
        variables,
      );
    },
    editAccount(
      variables: EditAccountMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<EditAccountMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditAccountMutation>({
            document: EditAccountDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "editAccount",
        "mutation",
        variables,
      );
    },
    createContact(
      variables: CreateContactMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<CreateContactMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateContactMutation>({
            document: CreateContactDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "createContact",
        "mutation",
        variables,
      );
    },
    editContact(
      variables: EditContactMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<EditContactMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditContactMutation>({
            document: EditContactDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "editContact",
        "mutation",
        variables,
      );
    },
    whoAmI(
      variables?: WhoAmIQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<WhoAmIQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<WhoAmIQuery>({
            document: WhoAmIDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "whoAmI",
        "query",
        variables,
      );
    },
    articles(
      variables?: ArticlesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<ArticlesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ArticlesQuery>({
            document: ArticlesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "articles",
        "query",
        variables,
      );
    },
    findArticle(
      variables: FindArticleQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FindArticleQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindArticleQuery>({
            document: FindArticleDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "findArticle",
        "query",
        variables,
      );
    },
    findAccounts(
      variables: FindAccountsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FindAccountsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindAccountsQuery>({
            document: FindAccountsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "findAccounts",
        "query",
        variables,
      );
    },
    findAccountByExternalKey(
      variables: FindAccountByExternalKeyQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FindAccountByExternalKeyQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindAccountByExternalKeyQuery>({
            document: FindAccountByExternalKeyDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "findAccountByExternalKey",
        "query",
        variables,
      );
    },
    findContacts(
      variables: FindContactsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FindContactsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindContactsQuery>({
            document: FindContactsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "findContacts",
        "query",
        variables,
      );
    },
    findAccountUser(
      variables?: FindAccountUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FindAccountUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindAccountUserQuery>({
            document: FindAccountUserDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "findAccountUser",
        "query",
        variables,
      );
    },
    getOrders(
      variables: GetOrdersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<GetOrdersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetOrdersQuery>({
            document: GetOrdersDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "getOrders",
        "query",
        variables,
      );
    },
    findPaymentTerm(
      variables: FindPaymentTermQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FindPaymentTermQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindPaymentTermQuery>({
            document: FindPaymentTermDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "findPaymentTerm",
        "query",
        variables,
      );
    },
    findDeliveryTerm(
      variables: FindDeliveryTermQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FindDeliveryTermQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindDeliveryTermQuery>({
            document: FindDeliveryTermDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "findDeliveryTerm",
        "query",
        variables,
      );
    },
    findDeliveryType(
      variables: FindDeliveryTypeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FindDeliveryTypeQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindDeliveryTypeQuery>({
            document: FindDeliveryTypeDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "findDeliveryType",
        "query",
        variables,
      );
    },
    findOrderTypes(
      variables: FindOrderTypesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FindOrderTypesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindOrderTypesQuery>({
            document: FindOrderTypesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "findOrderTypes",
        "query",
        variables,
      );
    },
    findOrderStatuses(
      variables: FindOrderStatusesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FindOrderStatusesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindOrderStatusesQuery>({
            document: FindOrderStatusesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "findOrderStatuses",
        "query",
        variables,
      );
    },
    findArticleUnits(
      variables: FindArticleUnitsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FindArticleUnitsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindArticleUnitsQuery>({
            document: FindArticleUnitsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "findArticleUnits",
        "query",
        variables,
      );
    },
    findAnyArticleGroup(
      variables?: FindAnyArticleGroupQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FindAnyArticleGroupQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindAnyArticleGroupQuery>({
            document: FindAnyArticleGroupDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "findAnyArticleGroup",
        "query",
        variables,
      );
    },
    findOrderDefaults(
      variables?: FindOrderDefaultsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<FindOrderDefaultsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindOrderDefaultsQuery>({
            document: FindOrderDefaultsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "findOrderDefaults",
        "query",
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
