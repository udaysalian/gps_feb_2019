import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IContract } from 'app/shared/model/contract.model';
import { getEntities as getContracts } from 'app/entities/contract/contract.reducer';
import { IMeasurementStation } from 'app/shared/model/measurement-station.model';
import { getEntities as getMeasurementStations } from 'app/entities/measurement-station/measurement-station.reducer';
import { getEntity, updateEntity, createEntity, reset } from './contr-loc.reducer';
import { IContrLoc } from 'app/shared/model/contr-loc.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContrLocUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IContrLocUpdateState {
  isNew: boolean;
  contractId: string;
  locationId: string;
}

export class ContrLocUpdate extends React.Component<IContrLocUpdateProps, IContrLocUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      contractId: '0',
      locationId: '0',
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

    this.props.getContracts();
    this.props.getMeasurementStations();
  }

  saveEntity = (event, errors, values) => {
    values.updateTimeStamp = convertDateTimeToServer(values.updateTimeStamp);

    if (errors.length === 0) {
      const { contrLocEntity } = this.props;
      const entity = {
        ...contrLocEntity,
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
    this.props.history.push('/entity/contr-loc');
  };

  render() {
    const { contrLocEntity, contracts, measurementStations, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gpsNetraApp.contrLoc.home.createOrEditLabel">Create or edit a ContrLoc</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : contrLocEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="contr-loc-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="typeLabel" for="type">
                    Type
                  </Label>
                  <AvField
                    id="contr-loc-type"
                    type="text"
                    name="type"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="quantityLabel" for="quantity">
                    Quantity
                  </Label>
                  <AvField
                    id="contr-loc-quantity"
                    type="string"
                    className="form-control"
                    name="quantity"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="effectiveFromDateLabel" for="effectiveFromDate">
                    Effective From Date
                  </Label>
                  <AvField id="contr-loc-effectiveFromDate" type="date" className="form-control" name="effectiveFromDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="effectiveToDateLabel" for="effectiveToDate">
                    Effective To Date
                  </Label>
                  <AvField id="contr-loc-effectiveToDate" type="date" className="form-control" name="effectiveToDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="updaterLabel" for="updater">
                    Updater
                  </Label>
                  <AvField id="contr-loc-updater" type="text" name="updater" />
                </AvGroup>
                <AvGroup>
                  <Label id="updateTimeStampLabel" for="updateTimeStamp">
                    Update Time Stamp
                  </Label>
                  <AvInput
                    id="contr-loc-updateTimeStamp"
                    type="datetime-local"
                    className="form-control"
                    name="updateTimeStamp"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.contrLocEntity.updateTimeStamp)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="businessUnitLabel" for="businessUnit">
                    Business Unit
                  </Label>
                  <AvField id="contr-loc-businessUnit" type="text" name="businessUnit" />
                </AvGroup>
                <AvGroup>
                  <Label for="contract.id">Contract</Label>
                  <AvInput id="contr-loc-contract" type="select" className="form-control" name="contractId">
                    <option value="" key="0" />
                    {contracts
                      ? contracts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="location.locationNbr">Location</Label>
                  <AvInput id="contr-loc-location" type="select" className="form-control" name="locationId">
                    <option value="" key="0" />
                    {measurementStations
                      ? measurementStations.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.locationNbr}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/contr-loc" replace color="info">
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
  contracts: storeState.contract.entities,
  measurementStations: storeState.measurementStation.entities,
  contrLocEntity: storeState.contrLoc.entity,
  loading: storeState.contrLoc.loading,
  updating: storeState.contrLoc.updating,
  updateSuccess: storeState.contrLoc.updateSuccess
});

const mapDispatchToProps = {
  getContracts,
  getMeasurementStations,
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
)(ContrLocUpdate);
