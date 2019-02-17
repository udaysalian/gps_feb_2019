import { Moment } from 'moment';

export interface IActivity {
  id?: number;
  contrId?: string;
  activityNbr?: string;
  transactionType?: string;
  updater?: string;
  updateTimeStamp?: Moment;
  businessUnit?: string;
  upstreamBABaAbbr?: string;
  upstreamBAId?: number;
  downstreamBABaAbbr?: string;
  downstreamBAId?: number;
  rtSchedRateScheduleCD?: string;
  rtSchedId?: number;
  receiptLocationLocationNbr?: string;
  receiptLocationId?: number;
  deliveryLocationLocationNbr?: string;
  deliveryLocationId?: number;
  upstreamContractContrId?: string;
  upstreamContractId?: number;
  downstreamContractContrId?: string;
  downstreamContractId?: number;
}

export const defaultValue: Readonly<IActivity> = {};
