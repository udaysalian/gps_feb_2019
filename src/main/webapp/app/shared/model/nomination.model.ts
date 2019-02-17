import { Moment } from 'moment';
import { INominationPriority } from 'app/shared/model/nomination-priority.model';

export const enum NomRequestStatus {
  NOMINATED = 'NOMINATED',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED'
}

export interface INomination {
  id?: number;
  gasDate?: Moment;
  requestedRcptQty?: number;
  reqestedDlvryQty?: number;
  scheduledRcptQty?: number;
  scheduledDlvryQty?: number;
  requestStatus?: NomRequestStatus;
  updater?: string;
  updateTimeStamp?: Moment;
  businessUnit?: string;
  activityActivityNbr?: string;
  activityId?: number;
  contractContrId?: string;
  contractId?: number;
  priorities?: INominationPriority[];
}

export const defaultValue: Readonly<INomination> = {};
