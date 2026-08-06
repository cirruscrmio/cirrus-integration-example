import {
  getGraphQLClient,
  type CreateOrderMutationVariables,
  type EditOrderMutationVariables,
} from "~/graphql";

/** Looks up orders in Cirrus by their externalKey. Used to check whether an
 * order has already been synced. */
export const findOrdersByExternalKey = async (externalKey: string) => {
  const client = await getGraphQLClient();

  const { orders } = await client.getOrders({ externalKey });

  return (orders?.edges ?? [])
    .map((edge) => edge?.node)
    .filter((node) => Boolean(node))
    .map((node) => node!);
};

export const createOrder = async (input: CreateOrderMutationVariables) => {
  const client = await getGraphQLClient();

  const { createOrder } = await client.createOrder(input);

  return createOrder?.order ?? undefined;
};

export const editOrder = async (input: EditOrderMutationVariables) => {
  const client = await getGraphQLClient();

  const { updateOrder } = await client.editOrder(input);

  return updateOrder?.order ?? undefined;
};

/** Resolves the owning Cirrus user for an account. Orders must be assigned to a
 * user, and we default to the account's own user/salesperson. */
export const findAccountUser = async (accountId: number) => {
  const client = await getGraphQLClient();

  const { account } = await client.findAccountUser({ accountId });

  return account?.user?.id ?? account?.userId ?? undefined;
};

/** Fetches the default order-related resources (delivery term/type, payment
 * term, order type and status) configured in Cirrus. These are required when
 * creating an order but rarely exist in the external system, so we fall back
 * to the tenant's defaults. */
export const findOrderDefaults = async () => {
  const client = await getGraphQLClient();

  const {
    deliveryTypes,
    deliveryTerms,
    paymentTerms,
    orderTypes,
    orderStatuses,
  } = await client.findOrderDefaults();

  const first = <T>(
    connection:
      | { edges?: Array<{ node?: T | null } | null> | null }
      | null
      | undefined,
  ) =>
    (connection?.edges ?? []).map((edge) => edge?.node).filter(Boolean)[0] ??
    undefined;

  return {
    deliveryType: first(deliveryTypes),
    deliveryTerm: first(deliveryTerms),
    paymentTerm: first(paymentTerms),
    orderType: first(orderTypes),
    orderStatus: first(orderStatuses),
  };
};
