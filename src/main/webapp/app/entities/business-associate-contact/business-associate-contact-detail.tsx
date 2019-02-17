import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './business-associate-contact.reducer';
import { IBusinessAssociateContact } from 'app/shared/model/business-associate-contact.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBusinessAssociateContactDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BusinessAssociateContactDetail extends React.Component<IBusinessAssociateContactDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { businessAssociateContactEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            BusinessAssociateContact [<b>{businessAssociateContactEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="beginDate">Begin Date</span>
            </dt>
            <dd>
              <TextFormat value={businessAssociateContactEntity.beginDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">End Date</span>
            </dt>
            <dd>
              <TextFormat value={businessAssociateContactEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>Business Associate</dt>
            <dd>{businessAssociateContactEntity.businessAssociateBaAbbr ? businessAssociateContactEntity.businessAssociateBaAbbr : ''}</dd>
            <dt>Mail Address</dt>
            <dd>{businessAssociateContactEntity.mailAddressId ? businessAssociateContactEntity.mailAddressId : ''}</dd>
            <dt>Delivery Address</dt>
            <dd>{businessAssociateContactEntity.deliveryAddressId ? businessAssociateContactEntity.deliveryAddressId : ''}</dd>
            <dt>Contact</dt>
            <dd>{businessAssociateContactEntity.contactId ? businessAssociateContactEntity.contactId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/business-associate-contact" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/business-associate-contact/${businessAssociateContactEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ businessAssociateContact }: IRootState) => ({
  businessAssociateContactEntity: businessAssociateContact.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessAssociateContactDetail);
