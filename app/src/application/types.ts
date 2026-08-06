export interface ExternalAccount {
  /** Stable identifier from the external system. Stored on the Cirrus account
   * as its `externalKey` so we can find it again on the next sync. */
  externalId: string;

  /** Display name of the account/company. Required to create it in Cirrus. */
  name: string;
}

export interface ExternalContact {
  /** Stable identifier from the external system. Stored on the Cirrus contact
   * as its `externalKey`. */
  externalId: string;

  firstName: string;

  lastName: string;
}

export interface ExternalOrder {
  /** Stable identifier from the external system. Stored on the Cirrus order as
   * its `externalKey`. */
  externalId: string;

  account: ExternalAccount;

  contact: ExternalContact;
}
