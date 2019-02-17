export interface IBusinessAssociateAddress {
  id?: number;
  addLine1?: string;
  addressNbr?: string;
  addLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  businessAssociateId?: number;
}

export const defaultValue: Readonly<IBusinessAssociateAddress> = {};
