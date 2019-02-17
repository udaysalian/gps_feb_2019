import { Moment } from 'moment';

export interface ILocationBA {
  id?: number;
  locationNbr?: string;
  locationBAType?: string;
  businessUnit?: string;
  updater?: string;
  updateTimestamp?: Moment;
  busAssocBaAbbr?: string;
  busAssocId?: number;
}

export const defaultValue: Readonly<ILocationBA> = {};
