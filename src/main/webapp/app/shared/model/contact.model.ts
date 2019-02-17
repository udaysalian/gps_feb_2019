import { Moment } from 'moment';

export interface IContact {
  id?: number;
  firstName?: string;
  lastName?: string;
  updater?: string;
  updateTimestamp?: Moment;
  loginIdLogin?: string;
  loginIdId?: number;
  employedByBaAbbr?: string;
  employedById?: number;
}

export const defaultValue: Readonly<IContact> = {};
