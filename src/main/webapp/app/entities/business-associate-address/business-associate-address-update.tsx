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
import { getEntity, updateEntity, createEntity, reset } from './business-associate-address.reducer';
import { IBusinessAssociateAddress } from 'app/shared/model/business-associate-address.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBusinessAssociateAddressUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBusinessAssociateAddressUpdateState {
  isNew: boolean;
  businessAssociateId: string;
}

export class BusinessAssociateAddressUpdate extends React.Component<
  IBusinessAssociateAddressUpdateProps,
  IBusinessAssociateAddressUpdateState
> {
  constructor(props) {
    super(props);
    this.state = {
      businessAssociateId: '0',
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { businessAssociateAddressEntity } = this.props;
      const entity = {
        ...businessAssociateAddressEntity,
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
    this.props.history.push('/entity/business-associate-address');
  };

  render() {
    const { businessAssociateAddressEntity, businessAssociates, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gpsNetraApp.businessAssociateAddress.home.createOrEditLabel">Create or edit a BusinessAssociateAddress</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : businessAssociateAddressEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="business-associate-address-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="addLine1Label" for="addLine1">
                    Add Line 1
                  </Label>
                  <AvField
                    id="business-associate-address-addLine1"
                    type="text"
                    name="addLine1"
                    validate={{
                      maxLength: { value: 100, errorMessage: 'This field cannot be longer than 100 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="addressNbrLabel" for="addressNbr">
                    Address Nbr
                  </Label>
                  <AvField id="business-associate-address-addressNbr" type="text" name="addressNbr" />
                </AvGroup>
                <AvGroup>
                  <Label id="addLine2Label" for="addLine2">
                    Add Line 2
                  </Label>
                  <AvField id="business-associate-address-addLine2" type="text" name="addLine2" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="city">
                    City
                  </Label>
                  <AvField
                    id="business-associate-address-city"
                    type="text"
                    name="city"
                    validate={{
                      maxLength: { value: 100, errorMessage: 'This field cannot be longer than 100 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="stateLabel" for="state">
                    State
                  </Label>
                  <AvField
                    id="business-associate-address-state"
                    type="text"
                    name="state"
                    validate={{
                      maxLength: { value: 100, errorMessage: 'This field cannot be longer than 100 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="zipCodeLabel" for="zipCode">
                    Zip Code
                  </Label>
                  <AvField
                    id="business-associate-address-zipCode"
                    type="text"
                    name="zipCode"
                    validate={{
                      maxLength: { value: 100, errorMessage: 'This field cannot be longer than 100 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="businessAssociate.id">Business Associate</Label>
                  <AvInput
                    id="business-associate-address-businessAssociate"
                    type="select"
                    className="form-control"
                    name="businessAssociateId"
                  >
                    <option value="" key="0" />
                    {businessAssociates
                      ? businessAssociates.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/business-associate-address" replace color="info">
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
  businessAssociateAddressEntity: storeState.businessAssociateAddress.entity,
  loading: storeState.businessAssociateAddress.loading,
  updating: storeState.businessAssociateAddress.updating,
  updateSuccess: storeState.businessAssociateAddress.updateSuccess
});

const mapDispatchToProps = {
  getBusinessAssociates,
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
)(BusinessAssociateAddressUpdate);
