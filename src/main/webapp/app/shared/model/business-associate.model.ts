import { IContract } from 'app/shared/model/contract.model';
import { IBusinessAssociateAddress } from 'app/shared/model/business-associate-address.model';

export interface IBusinessAssociate {
  id?: number;
  baName?: string;
  baAbbr?: string;
  baNbr?: string;
  baDunsNbr?: string;
  contracts?: IContract[];
  businessAssociateAddresses?: IBusinessAssociateAddress[];
}

export const defaultValue: Readonly<IBusinessAssociate> = {};
