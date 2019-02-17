import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ReductionReason from './reduction-reason';
import ReductionReasonDetail from './reduction-reason-detail';
import ReductionReasonUpdate from './reduction-reason-update';
import ReductionReasonDeleteDialog from './reduction-reason-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ReductionReasonUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ReductionReasonUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ReductionReasonDetail} />
      <ErrorBoundaryRoute path={match.url} component={ReductionReason} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ReductionReasonDeleteDialog} />
  </>
);

export default Routes;
