import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RateSched from './rate-sched';
import RateSchedDetail from './rate-sched-detail';
import RateSchedUpdate from './rate-sched-update';
import RateSchedDeleteDialog from './rate-sched-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RateSchedUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RateSchedUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RateSchedDetail} />
      <ErrorBoundaryRoute path={match.url} component={RateSched} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RateSchedDeleteDialog} />
  </>
);

export default Routes;
