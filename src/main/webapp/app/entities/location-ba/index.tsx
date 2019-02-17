import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LocationBA from './location-ba';
import LocationBADetail from './location-ba-detail';
import LocationBAUpdate from './location-ba-update';
import LocationBADeleteDialog from './location-ba-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LocationBAUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LocationBAUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LocationBADetail} />
      <ErrorBoundaryRoute path={match.url} component={LocationBA} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LocationBADeleteDialog} />
  </>
);

export default Routes;
