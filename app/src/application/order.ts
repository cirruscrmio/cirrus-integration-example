import { listAccounts } from "~/graphql/account";
import type { ExternalOrder } from "./types";

export const syncOrders = async (orders: ExternalOrder[]) => {
  const externalAccountIds = orders.map((order) => order.account.externalId);

  const externalAccounts = await listAccounts({
    externalIds: externalAccountIds,
  });

  console.log(orders, externalAccounts);
};
