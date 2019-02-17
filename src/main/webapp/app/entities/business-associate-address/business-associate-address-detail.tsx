import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './business-associate-address.reducer';
import { IBusinessAssociateAddress } from 'app/shared/model/business-associate-address.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBusinessAssociateAddressDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BusinessAssociateAddressDetail extends React.Component<IBusinessAssociateAddressDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { businessAssociateAddressEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            BusinessAssociateAddress [<b>{businessAssociateAddressEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="addLine1">Add Line 1</span>
            </dt>
            <dd>{businessAssociateAddressEntity.addLine1}</dd>
            <dt>
              <span id="addressNbr">Address Nbr</span>
            </dt>
            <dd>{businessAssociateAddressEntity.addressNbr}</dd>
            <dt>
              <span id="addLine2">Add Line 2</span>
            </dt>
            <dd>{businessAssociateAddressEntity.addLine2}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{businessAssociateAddressEntity.city}</dd>
            <dt>
              <span id="state">State</span>
            </dt>
            <dd>{businessAssociateAddressEntity.state}</dd>
            <dt>
              <span id="zipCode">Zip Code</span>
            </dt>
            <dd>{businessAssociateAddressEntity.zipCode}</dd>
            <dt>Business Associate</dt>
            <dd>{businessAssociateAddressEntity.businessAssociateId ? businessAssociateAddressEntity.businessAssociateId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/business-associate-address" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/business-associate-address/${businessAssociateAddressEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ businessAssociateAddress }: IRootState) => ({
  businessAssociateAddressEntity: businessAssociateAddress.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessAssociateAddressDetail);
