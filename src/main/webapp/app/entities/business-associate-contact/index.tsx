import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BusinessAssociateContact from './business-associate-contact';
import BusinessAssociateContactDetail from './business-associate-contact-detail';
import BusinessAssociateContactUpdate from './business-associate-contact-update';
import BusinessAssociateContactDeleteDialog from './business-associate-contact-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BusinessAssociateContactUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BusinessAssociateContactUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BusinessAssociateContactDetail} />
      <ErrorBoundaryRoute path={match.url} component={BusinessAssociateContact} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={BusinessAssociateContactDeleteDialog} />
  </>
);

export default Routes;
