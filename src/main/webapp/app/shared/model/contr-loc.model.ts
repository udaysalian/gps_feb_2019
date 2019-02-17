import { Moment } from 'moment';

export interface IContrLoc {
  id?: number;
  type?: string;
  quantity?: number;
  effectiveFromDate?: Moment;
  effectiveToDate?: Moment;
  updater?: string;
  updateTimeStamp?: Moment;
  businessUnit?: string;
  contractId?: number;
  locationLocationNbr?: string;
  locationId?: number;
}

export const defaultValue: Readonly<IContrLoc> = {};
