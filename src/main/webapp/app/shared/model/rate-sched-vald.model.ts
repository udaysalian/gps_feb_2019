import { Moment } from 'moment';

export interface IRateSchedVald {
  id?: number;
  validType?: string;
  updater?: string;
  updateTimeStamp?: Moment;
  businessUnit?: string;
  rateSchdRateScheduleCD?: string;
  rateSchdId?: number;
}

export const defaultValue: Readonly<IRateSchedVald> = {};
