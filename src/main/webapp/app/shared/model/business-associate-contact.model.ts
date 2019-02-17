import { Moment } from 'moment';

export interface IBusinessAssociateContact {
  id?: number;
  beginDate?: Moment;
  endDate?: Moment;
  businessAssociateBaAbbr?: string;
  businessAssociateId?: number;
  mailAddressId?: number;
  deliveryAddressId?: number;
  contactId?: number;
}

export const defaultValue: Readonly<IBusinessAssociateContact> = {};
