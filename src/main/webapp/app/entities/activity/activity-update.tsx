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
import { IRateSched } from 'app/shared/model/rate-sched.model';
import { getEntities as getRateScheds } from 'app/entities/rate-sched/rate-sched.reducer';
import { IMeasurementStation } from 'app/shared/model/measurement-station.model';
import { getEntities as getMeasurementStations } from 'app/entities/measurement-station/measurement-station.reducer';
import { IContract } from 'app/shared/model/contract.model';
import { getEntities as getContracts } from 'app/entities/contract/contract.reducer';
import { getEntity, updateEntity, createEntity, reset } from './activity.reducer';
import { IActivity } from 'app/shared/model/activity.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IActivityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IActivityUpdateState {
  isNew: boolean;
  upstreamBAId: string;
  downstreamBAId: string;
  rtSchedId: string;
  receiptLocationId: string;
  deliveryLocationId: string;
  upstreamContractId: string;
  downstreamContractId: string;
}

export class ActivityUpdate extends React.Component<IActivityUpdateProps, IActivityUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      upstreamBAId: '0',
      downstreamBAId: '0',
      rtSchedId: '0',
      receiptLocationId: '0',
      deliveryLocationId: '0',
      upstreamContractId: '0',
      downstreamContractId: '0',
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
    this.props.getRateScheds();
    this.props.getMeasurementStations();
    this.props.getContracts();
  }

  saveEntity = (event, errors, values) => {
    values.updateTimeStamp = convertDateTimeToServer(values.updateTimeStamp);

    if (errors.length === 0) {
      const { activityEntity } = this.props;
      const entity = {
        ...activityEntity,
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
    this.props.history.push('/entity/activity');
  };

  render() {
    const { activityEntity, businessAssociates, rateScheds, measurementStations, contracts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gpsNetraApp.activity.home.createOrEditLabel">Create or edit a Activity</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : activityEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="activity-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="contrIdLabel" for="contrId">
                    Contr Id
                  </Label>
                  <AvField
                    id="activity-contrId"
                    type="text"
                    name="contrId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="activityNbrLabel" for="activityNbr">
                    Activity Nbr
                  </Label>
                  <AvField
                    id="activity-activityNbr"
                    type="text"
                    name="activityNbr"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="transactionTypeLabel" for="transactionType">
                    Transaction Type
                  </Label>
                  <AvField id="activity-transactionType" type="text" name="transactionType" />
                </AvGroup>
                <AvGroup>
                  <Label id="updaterLabel" for="updater">
                    Updater
                  </Label>
                  <AvField id="activity-updater" type="text" name="updater" />
                </AvGroup>
                <AvGroup>
                  <Label id="updateTimeStampLabel" for="updateTimeStamp">
                    Update Time Stamp
                  </Label>
                  <AvInput
                    id="activity-updateTimeStamp"
                    type="datetime-local"
                    className="form-control"
                    name="updateTimeStamp"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.activityEntity.updateTimeStamp)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="businessUnitLabel" for="businessUnit">
                    Business Unit
                  </Label>
                  <AvField
                    id="activity-businessUnit"
                    type="text"
                    name="businessUnit"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="upstreamBA.baAbbr">Upstream BA</Label>
                  <AvInput id="activity-upstreamBA" type="select" className="form-control" name="upstreamBAId">
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
                  <Label for="downstreamBA.baAbbr">Downstream BA</Label>
                  <AvInput id="activity-downstreamBA" type="select" className="form-control" name="downstreamBAId">
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
                  <Label for="rtSched.rateScheduleCD">Rt Sched</Label>
                  <AvInput id="activity-rtSched" type="select" className="form-control" name="rtSchedId">
                    <option value="" key="0" />
                    {rateScheds
                      ? rateScheds.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.rateScheduleCD}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="receiptLocation.locationNbr">Receipt Location</Label>
                  <AvInput id="activity-receiptLocation" type="select" className="form-control" name="receiptLocationId">
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
                <AvGroup>
                  <Label for="deliveryLocation.locationNbr">Delivery Location</Label>
                  <AvInput id="activity-deliveryLocation" type="select" className="form-control" name="deliveryLocationId">
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
                <AvGroup>
                  <Label for="upstreamContract.contrId">Upstream Contract</Label>
                  <AvInput id="activity-upstreamContract" type="select" className="form-control" name="upstreamContractId">
                    <option value="" key="0" />
                    {contracts
                      ? contracts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.contrId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="downstreamContract.contrId">Downstream Contract</Label>
                  <AvInput id="activity-downstreamContract" type="select" className="form-control" name="downstreamContractId">
                    <option value="" key="0" />
                    {contracts
                      ? contracts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.contrId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/activity" replace color="info">
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
  rateScheds: storeState.rateSched.entities,
  measurementStations: storeState.measurementStation.entities,
  contracts: storeState.contract.entities,
  activityEntity: storeState.activity.entity,
  loading: storeState.activity.loading,
  updating: storeState.activity.updating,
  updateSuccess: storeState.activity.updateSuccess
});

const mapDispatchToProps = {
  getBusinessAssociates,
  getRateScheds,
  getMeasurementStations,
  getContracts,
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
)(ActivityUpdate);
