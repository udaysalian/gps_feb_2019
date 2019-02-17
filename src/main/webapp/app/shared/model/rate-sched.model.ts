import { Moment } from 'moment';
import { IRateSchedVald } from 'app/shared/model/rate-sched-vald.model';

export interface IRateSched {
  id?: number;
  rsType?: string;
  rateScheduleCD?: string;
  updater?: string;
  updateTimeStamp?: Moment;
  businessUnit?: string;
  rtSchedValds?: IRateSchedVald[];
}

export const defaultValue: Readonly<IRateSched> = {};
