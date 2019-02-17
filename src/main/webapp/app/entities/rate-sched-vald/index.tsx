import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RateSchedVald from './rate-sched-vald';
import RateSchedValdDetail from './rate-sched-vald-detail';
import RateSchedValdUpdate from './rate-sched-vald-update';
import RateSchedValdDeleteDialog from './rate-sched-vald-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RateSchedValdUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RateSchedValdUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RateSchedValdDetail} />
      <ErrorBoundaryRoute path={match.url} component={RateSchedVald} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RateSchedValdDeleteDialog} />
  </>
);

export default Routes;
