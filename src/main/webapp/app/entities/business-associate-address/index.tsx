import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BusinessAssociateAddress from './business-associate-address';
import BusinessAssociateAddressDetail from './business-associate-address-detail';
import BusinessAssociateAddressUpdate from './business-associate-address-update';
import BusinessAssociateAddressDeleteDialog from './business-associate-address-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BusinessAssociateAddressUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BusinessAssociateAddressUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BusinessAssociateAddressDetail} />
      <ErrorBoundaryRoute path={match.url} component={BusinessAssociateAddress} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={BusinessAssociateAddressDeleteDialog} />
  </>
);

export default Routes;
