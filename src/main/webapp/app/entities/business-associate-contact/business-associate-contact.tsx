import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './business-associate-contact.reducer';
import { IBusinessAssociateContact } from 'app/shared/model/business-associate-contact.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBusinessAssociateContactProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class BusinessAssociateContact extends React.Component<IBusinessAssociateContactProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { businessAssociateContactList, match } = this.props;
    return (
      <div>
        <h2 id="business-associate-contact-heading">
          Business Associate Contacts
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Business Associate Contact
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Begin Date</th>
                <th>End Date</th>
                <th>Business Associate</th>
                <th>Mail Address</th>
                <th>Delivery Address</th>
                <th>Contact</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {businessAssociateContactList.map((businessAssociateContact, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${businessAssociateContact.id}`} color="link" size="sm">
                      {businessAssociateContact.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={businessAssociateContact.beginDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={businessAssociateContact.endDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {businessAssociateContact.businessAssociateBaAbbr ? (
                      <Link to={`business-associate/${businessAssociateContact.businessAssociateId}`}>
                        {businessAssociateContact.businessAssociateBaAbbr}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {businessAssociateContact.mailAddressId ? (
                      <Link to={`business-associate-address/${businessAssociateContact.mailAddressId}`}>
                        {businessAssociateContact.mailAddressId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {businessAssociateContact.deliveryAddressId ? (
                      <Link to={`business-associate-address/${businessAssociateContact.deliveryAddressId}`}>
                        {businessAssociateContact.deliveryAddressId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {businessAssociateContact.contactId ? (
                      <Link to={`contact/${businessAssociateContact.contactId}`}>{businessAssociateContact.contactId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${businessAssociateContact.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${businessAssociateContact.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${businessAssociateContact.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ businessAssociateContact }: IRootState) => ({
  businessAssociateContactList: businessAssociateContact.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessAssociateContact);
