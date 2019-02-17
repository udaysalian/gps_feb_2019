import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NominationPriority from './nomination-priority';
import NominationPriorityDetail from './nomination-priority-detail';
import NominationPriorityUpdate from './nomination-priority-update';
import NominationPriorityDeleteDialog from './nomination-priority-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NominationPriorityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NominationPriorityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NominationPriorityDetail} />
      <ErrorBoundaryRoute path={match.url} component={NominationPriority} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NominationPriorityDeleteDialog} />
  </>
);

export default Routes;
