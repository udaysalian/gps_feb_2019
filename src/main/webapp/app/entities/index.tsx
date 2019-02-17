import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Nomination from './nomination';
import ReductionReason from './reduction-reason';
import Activity from './activity';
import RateSched from './rate-sched';
import RateSchedVald from './rate-sched-vald';
import NominationPriority from './nomination-priority';
import Contract from './contract';
import ContrLoc from './contr-loc';
import BusinessAssociate from './business-associate';
import BusinessAssociateAddress from './business-associate-address';
import MeasurementStation from './measurement-station';
import LocationBA from './location-ba';
import Contact from './contact';
import BusinessUnit from './business-unit';
import BusinessAssociateContact from './business-associate-contact';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/nomination`} component={Nomination} />
      <ErrorBoundaryRoute path={`${match.url}/reduction-reason`} component={ReductionReason} />
      <ErrorBoundaryRoute path={`${match.url}/activity`} component={Activity} />
      <ErrorBoundaryRoute path={`${match.url}/rate-sched`} component={RateSched} />
      <ErrorBoundaryRoute path={`${match.url}/rate-sched-vald`} component={RateSchedVald} />
      <ErrorBoundaryRoute path={`${match.url}/nomination-priority`} component={NominationPriority} />
      <ErrorBoundaryRoute path={`${match.url}/contract`} component={Contract} />
      <ErrorBoundaryRoute path={`${match.url}/contr-loc`} component={ContrLoc} />
      <ErrorBoundaryRoute path={`${match.url}/business-associate`} component={BusinessAssociate} />
      <ErrorBoundaryRoute path={`${match.url}/business-associate-address`} component={BusinessAssociateAddress} />
      <ErrorBoundaryRoute path={`${match.url}/measurement-station`} component={MeasurementStation} />
      <ErrorBoundaryRoute path={`${match.url}/location-ba`} component={LocationBA} />
      <ErrorBoundaryRoute path={`${match.url}/contact`} component={Contact} />
      <ErrorBoundaryRoute path={`${match.url}/business-unit`} component={BusinessUnit} />
      <ErrorBoundaryRoute path={`${match.url}/business-associate-contact`} component={BusinessAssociateContact} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
