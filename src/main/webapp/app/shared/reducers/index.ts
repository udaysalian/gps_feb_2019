import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import nomination, {
  NominationState
} from 'app/entities/nomination/nomination.reducer';
// prettier-ignore
import reductionReason, {
  ReductionReasonState
} from 'app/entities/reduction-reason/reduction-reason.reducer';
// prettier-ignore
import activity, {
  ActivityState
} from 'app/entities/activity/activity.reducer';
// prettier-ignore
import rateSched, {
  RateSchedState
} from 'app/entities/rate-sched/rate-sched.reducer';
// prettier-ignore
import rateSchedVald, {
  RateSchedValdState
} from 'app/entities/rate-sched-vald/rate-sched-vald.reducer';
// prettier-ignore
import nominationPriority, {
  NominationPriorityState
} from 'app/entities/nomination-priority/nomination-priority.reducer';
// prettier-ignore
import contract, {
  ContractState
} from 'app/entities/contract/contract.reducer';
// prettier-ignore
import contrLoc, {
  ContrLocState
} from 'app/entities/contr-loc/contr-loc.reducer';
// prettier-ignore
import businessAssociate, {
  BusinessAssociateState
} from 'app/entities/business-associate/business-associate.reducer';
// prettier-ignore
import businessAssociateAddress, {
  BusinessAssociateAddressState
} from 'app/entities/business-associate-address/business-associate-address.reducer';
// prettier-ignore
import measurementStation, {
  MeasurementStationState
} from 'app/entities/measurement-station/measurement-station.reducer';
// prettier-ignore
import locationBA, {
  LocationBAState
} from 'app/entities/location-ba/location-ba.reducer';
// prettier-ignore
import contact, {
  ContactState
} from 'app/entities/contact/contact.reducer';
// prettier-ignore
import businessUnit, {
  BusinessUnitState
} from 'app/entities/business-unit/business-unit.reducer';
// prettier-ignore
import businessAssociateContact, {
  BusinessAssociateContactState
} from 'app/entities/business-associate-contact/business-associate-contact.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly nomination: NominationState;
  readonly reductionReason: ReductionReasonState;
  readonly activity: ActivityState;
  readonly rateSched: RateSchedState;
  readonly rateSchedVald: RateSchedValdState;
  readonly nominationPriority: NominationPriorityState;
  readonly contract: ContractState;
  readonly contrLoc: ContrLocState;
  readonly businessAssociate: BusinessAssociateState;
  readonly businessAssociateAddress: BusinessAssociateAddressState;
  readonly measurementStation: MeasurementStationState;
  readonly locationBA: LocationBAState;
  readonly contact: ContactState;
  readonly businessUnit: BusinessUnitState;
  readonly businessAssociateContact: BusinessAssociateContactState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  nomination,
  reductionReason,
  activity,
  rateSched,
  rateSchedVald,
  nominationPriority,
  contract,
  contrLoc,
  businessAssociate,
  businessAssociateAddress,
  measurementStation,
  locationBA,
  contact,
  businessUnit,
  businessAssociateContact,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
