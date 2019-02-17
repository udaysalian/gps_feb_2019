import { Moment } from 'moment';

export interface IBusinessUnit {
  id?: number;
  businessUnit?: string;
  businessAssociateNbr?: string;
  ediPipeId?: string;
  companyLogoContentType?: string;
  companyLogo?: any;
  updater?: string;
  updateTimestamp?: Moment;
}

export const defaultValue: Readonly<IBusinessUnit> = {};
