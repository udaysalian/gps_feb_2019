import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './business-associate-address.reducer';
import { IBusinessAssociateAddress } from 'app/shared/model/business-associate-address.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBusinessAssociateAddressProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class BusinessAssociateAddress extends React.Component<IBusinessAssociateAddressProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { businessAssociateAddressList, match } = this.props;
    return (
      <div>
        <h2 id="business-associate-address-heading">
          Business Associate Addresses
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Business Associate Address
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Add Line 1</th>
                <th>Address Nbr</th>
                <th>Add Line 2</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Business Associate</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {businessAssociateAddressList.map((businessAssociateAddress, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${businessAssociateAddress.id}`} color="link" size="sm">
                      {businessAssociateAddress.id}
                    </Button>
                  </td>
                  <td>{businessAssociateAddress.addLine1}</td>
                  <td>{businessAssociateAddress.addressNbr}</td>
                  <td>{businessAssociateAddress.addLine2}</td>
                  <td>{businessAssociateAddress.city}</td>
                  <td>{businessAssociateAddress.state}</td>
                  <td>{businessAssociateAddress.zipCode}</td>
                  <td>
                    {businessAssociateAddress.businessAssociateId ? (
                      <Link to={`business-associate/${businessAssociateAddress.businessAssociateId}`}>
                        {businessAssociateAddress.businessAssociateId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${businessAssociateAddress.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${businessAssociateAddress.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${businessAssociateAddress.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ businessAssociateAddress }: IRootState) => ({
  businessAssociateAddressList: businessAssociateAddress.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessAssociateAddress);
