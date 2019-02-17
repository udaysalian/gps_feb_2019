import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ContrLoc from './contr-loc';
import ContrLocDetail from './contr-loc-detail';
import ContrLocUpdate from './contr-loc-update';
import ContrLocDeleteDialog from './contr-loc-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ContrLocUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ContrLocUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ContrLocDetail} />
      <ErrorBoundaryRoute path={match.url} component={ContrLoc} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ContrLocDeleteDialog} />
  </>
);

export default Routes;
