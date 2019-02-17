import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Nomination from './nomination';
import NominationDetail from './nomination-detail';
import NominationUpdate from './nomination-update';
import NominationDeleteDialog from './nomination-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NominationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NominationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NominationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Nomination} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NominationDeleteDialog} />
  </>
);

export default Routes;
