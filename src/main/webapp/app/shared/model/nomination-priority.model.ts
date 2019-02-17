import { Moment } from 'moment';

export interface INominationPriority {
  id?: number;
  gasDate?: Moment;
  prtyTp?: string;
  oldQty?: number;
  newQty?: number;
  subType?: string;
  dirOfFlow?: string;
  updater?: string;
  updateTimeStamp?: Moment;
  businessUnit?: string;
  nominationId?: number;
  activityActivityNbr?: string;
  activityId?: number;
  contractContrId?: string;
  contractId?: number;
}

export const defaultValue: Readonly<INominationPriority> = {};
