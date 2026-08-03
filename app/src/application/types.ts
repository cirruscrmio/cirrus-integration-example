export interface ExternalAccount {
  externalId: string;
}

export interface ExternalContact {
  externalId: string;
}

export interface ExternalOrder {
  account: ExternalAccount;

  contact: ExternalContact;

  externalId: string;
}
