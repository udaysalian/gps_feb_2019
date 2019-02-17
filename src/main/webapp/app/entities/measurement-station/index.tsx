import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MeasurementStation from './measurement-station';
import MeasurementStationDetail from './measurement-station-detail';
import MeasurementStationUpdate from './measurement-station-update';
import MeasurementStationDeleteDialog from './measurement-station-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MeasurementStationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MeasurementStationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MeasurementStationDetail} />
      <ErrorBoundaryRoute path={match.url} component={MeasurementStation} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MeasurementStationDeleteDialog} />
  </>
);

export default Routes;
