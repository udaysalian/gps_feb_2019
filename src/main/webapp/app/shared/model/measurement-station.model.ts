import { Moment } from 'moment';

export interface IMeasurementStation {
  id?: number;
  locationNbr?: string;
  milepostNbr?: number;
  upstreamPipeNode?: string;
  downStreamPipeNode?: string;
  businessUnit?: string;
  updater?: string;
  updateTimestamp?: Moment;
}

export const defaultValue: Readonly<IMeasurementStation> = {};
