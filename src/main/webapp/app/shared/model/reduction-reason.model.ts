export interface IReductionReason {
  id?: number;
  reason?: string;
  proprieteryReasonCode?: string;
  businessUnit?: string;
}

export const defaultValue: Readonly<IReductionReason> = {};
