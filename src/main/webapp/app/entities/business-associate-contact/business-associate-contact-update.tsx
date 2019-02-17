import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBusinessAssociate } from 'app/shared/model/business-associate.model';
import { getEntities as getBusinessAssociates } from 'app/entities/business-associate/business-associate.reducer';
import { IBusinessAssociateAddress } from 'app/shared/model/business-associate-address.model';
import { getEntities as getBusinessAssociateAddresses } from 'app/entities/business-associate-address/business-associate-address.reducer';
import { IContact } from 'app/shared/model/contact.model';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { getEntity, updateEntity, createEntity, reset } from './business-associate-contact.reducer';
import { IBusinessAssociateContact } from 'app/shared/model/business-associate-contact.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBusinessAssociateContactUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBusinessAssociateContactUpdateState {
  isNew: boolean;
  businessAssociateId: string;
  mailAddressId: string;
  deliveryAddressId: string;
  contactId: string;
}

export class BusinessAssociateContactUpdate extends React.Component<
  IBusinessAssociateContactUpdateProps,
  IBusinessAssociateContactUpdateState
> {
  constructor(props) {
    super(props);
    this.state = {
      businessAssociateId: '0',
      mailAddressId: '0',
      deliveryAddressId: '0',
      contactId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getBusinessAssociates();
    this.props.getBusinessAssociateAddresses();
    this.props.getContacts();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { businessAssociateContactEntity } = this.props;
      const entity = {
        ...businessAssociateContactEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/business-associate-contact');
  };

  render() {
    const { businessAssociateContactEntity, businessAssociates, businessAssociateAddresses, contacts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gpsNetraApp.businessAssociateContact.home.createOrEditLabel">Create or edit a BusinessAssociateContact</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : businessAssociateContactEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="business-associate-contact-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="beginDateLabel" for="beginDate">
                    Begin Date
                  </Label>
                  <AvField id="business-associate-contact-beginDate" type="date" className="form-control" name="beginDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="endDate">
                    End Date
                  </Label>
                  <AvField id="business-associate-contact-endDate" type="date" className="form-control" name="endDate" />
                </AvGroup>
                <AvGroup>
                  <Label for="businessAssociate.baAbbr">Business Associate</Label>
                  <AvInput
                    id="business-associate-contact-businessAssociate"
                    type="select"
                    className="form-control"
                    name="businessAssociateId"
                  >
                    <option value="" key="0" />
                    {businessAssociates
                      ? businessAssociates.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.baAbbr}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="mailAddress.id">Mail Address</Label>
                  <AvInput id="business-associate-contact-mailAddress" type="select" className="form-control" name="mailAddressId">
                    <option value="" key="0" />
                    {businessAssociateAddresses
                      ? businessAssociateAddresses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="deliveryAddress.id">Delivery Address</Label>
                  <AvInput id="business-associate-contact-deliveryAddress" type="select" className="form-control" name="deliveryAddressId">
                    <option value="" key="0" />
                    {businessAssociateAddresses
                      ? businessAssociateAddresses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="contact.id">Contact</Label>
                  <AvInput id="business-associate-contact-contact" type="select" className="form-control" name="contactId">
                    <option value="" key="0" />
                    {contacts
                      ? contacts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/business-associate-contact" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  businessAssociates: storeState.businessAssociate.entities,
  businessAssociateAddresses: storeState.businessAssociateAddress.entities,
  contacts: storeState.contact.entities,
  businessAssociateContactEntity: storeState.businessAssociateContact.entity,
  loading: storeState.businessAssociateContact.loading,
  updating: storeState.businessAssociateContact.updating,
  updateSuccess: storeState.businessAssociateContact.updateSuccess
});

const mapDispatchToProps = {
  getBusinessAssociates,
  getBusinessAssociateAddresses,
  getContacts,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessAssociateContactUpdate);
