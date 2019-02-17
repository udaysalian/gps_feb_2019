import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IActivity } from 'app/shared/model/activity.model';
import { getEntities as getActivities } from 'app/entities/activity/activity.reducer';
import { IContract } from 'app/shared/model/contract.model';
import { getEntities as getContracts } from 'app/entities/contract/contract.reducer';
import { getEntity, updateEntity, createEntity, reset } from './nomination.reducer';
import { INomination } from 'app/shared/model/nomination.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INominationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INominationUpdateState {
  isNew: boolean;
  activityId: string;
  contractId: string;
}

export class NominationUpdate extends React.Component<INominationUpdateProps, INominationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      activityId: '0',
      contractId: '0',
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

    this.props.getActivities();
    this.props.getContracts();
  }

  saveEntity = (event, errors, values) => {
    values.updateTimeStamp = convertDateTimeToServer(values.updateTimeStamp);

    if (errors.length === 0) {
      const { nominationEntity } = this.props;
      const entity = {
        ...nominationEntity,
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
    this.props.history.push('/entity/nomination');
  };

  render() {
    const { nominationEntity, activities, contracts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gpsNetraApp.nomination.home.createOrEditLabel">Create or edit a Nomination</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : nominationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="nomination-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="gasDateLabel" for="gasDate">
                    Gas Date
                  </Label>
                  <AvField
                    id="nomination-gasDate"
                    type="date"
                    className="form-control"
                    name="gasDate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="requestedRcptQtyLabel" for="requestedRcptQty">
                    Requested Rcpt Qty
                  </Label>
                  <AvField
                    id="nomination-requestedRcptQty"
                    type="string"
                    className="form-control"
                    name="requestedRcptQty"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="reqestedDlvryQtyLabel" for="reqestedDlvryQty">
                    Reqested Dlvry Qty
                  </Label>
                  <AvField
                    id="nomination-reqestedDlvryQty"
                    type="string"
                    className="form-control"
                    name="reqestedDlvryQty"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="scheduledRcptQtyLabel" for="scheduledRcptQty">
                    Scheduled Rcpt Qty
                  </Label>
                  <AvField
                    id="nomination-scheduledRcptQty"
                    type="string"
                    className="form-control"
                    name="scheduledRcptQty"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="scheduledDlvryQtyLabel" for="scheduledDlvryQty">
                    Scheduled Dlvry Qty
                  </Label>
                  <AvField
                    id="nomination-scheduledDlvryQty"
                    type="string"
                    className="form-control"
                    name="scheduledDlvryQty"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="requestStatusLabel">Request Status</Label>
                  <AvInput
                    id="nomination-requestStatus"
                    type="select"
                    className="form-control"
                    name="requestStatus"
                    value={(!isNew && nominationEntity.requestStatus) || 'NOMINATED'}
                  >
                    <option value="NOMINATED">NOMINATED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="updaterLabel" for="updater">
                    Updater
                  </Label>
                  <AvField id="nomination-updater" type="text" name="updater" />
                </AvGroup>
                <AvGroup>
                  <Label id="updateTimeStampLabel" for="updateTimeStamp">
                    Update Time Stamp
                  </Label>
                  <AvInput
                    id="nomination-updateTimeStamp"
                    type="datetime-local"
                    className="form-control"
                    name="updateTimeStamp"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.nominationEntity.updateTimeStamp)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="businessUnitLabel" for="businessUnit">
                    Business Unit
                  </Label>
                  <AvField
                    id="nomination-businessUnit"
                    type="text"
                    name="businessUnit"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="activity.activityNbr">Activity</Label>
                  <AvInput id="nomination-activity" type="select" className="form-control" name="activityId">
                    <option value="" key="0" />
                    {activities
                      ? activities.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.activityNbr}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="contract.contrId">Contract</Label>
                  <AvInput id="nomination-contract" type="select" className="form-control" name="contractId">
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
                <Button tag={Link} id="cancel-save" to="/entity/nomination" replace color="info">
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
  activities: storeState.activity.entities,
  contracts: storeState.contract.entities,
  nominationEntity: storeState.nomination.entity,
  loading: storeState.nomination.loading,
  updating: storeState.nomination.updating,
  updateSuccess: storeState.nomination.updateSuccess
});

const mapDispatchToProps = {
  getActivities,
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
)(NominationUpdate);
