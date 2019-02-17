import { Moment } from 'moment';
import { IContrLoc } from 'app/shared/model/contr-loc.model';

export interface IContract {
  id?: number;
  contrId?: string;
  status?: string;
  updater?: string;
  updateTimeStamp?: Moment;
  businessUnit?: string;
  contrLocs?: IContrLoc[];
  rtSchedRateScheduleCD?: string;
  rtSchedId?: number;
  busAssocBaAbbr?: string;
  busAssocId?: number;
}

export const defaultValue: Readonly<IContract> = {};
