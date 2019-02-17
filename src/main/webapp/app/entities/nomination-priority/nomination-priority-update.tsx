import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { INomination } from 'app/shared/model/nomination.model';
import { getEntities as getNominations } from 'app/entities/nomination/nomination.reducer';
import { IActivity } from 'app/shared/model/activity.model';
import { getEntities as getActivities } from 'app/entities/activity/activity.reducer';
import { IContract } from 'app/shared/model/contract.model';
import { getEntities as getContracts } from 'app/entities/contract/contract.reducer';
import { getEntity, updateEntity, createEntity, reset } from './nomination-priority.reducer';
import { INominationPriority } from 'app/shared/model/nomination-priority.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INominationPriorityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INominationPriorityUpdateState {
  isNew: boolean;
  nominationId: string;
  activityId: string;
  contractId: string;
}

export class NominationPriorityUpdate extends React.Component<INominationPriorityUpdateProps, INominationPriorityUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      nominationId: '0',
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

    this.props.getNominations();
    this.props.getActivities();
    this.props.getContracts();
  }

  saveEntity = (event, errors, values) => {
    values.updateTimeStamp = convertDateTimeToServer(values.updateTimeStamp);

    if (errors.length === 0) {
      const { nominationPriorityEntity } = this.props;
      const entity = {
        ...nominationPriorityEntity,
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
    this.props.history.push('/entity/nomination-priority');
  };

  render() {
    const { nominationPriorityEntity, nominations, activities, contracts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gpsNetraApp.nominationPriority.home.createOrEditLabel">Create or edit a NominationPriority</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : nominationPriorityEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="nomination-priority-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="gasDateLabel" for="gasDate">
                    Gas Date
                  </Label>
                  <AvField
                    id="nomination-priority-gasDate"
                    type="date"
                    className="form-control"
                    name="gasDate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="prtyTpLabel" for="prtyTp">
                    Prty Tp
                  </Label>
                  <AvField
                    id="nomination-priority-prtyTp"
                    type="text"
                    name="prtyTp"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="oldQtyLabel" for="oldQty">
                    Old Qty
                  </Label>
                  <AvField
                    id="nomination-priority-oldQty"
                    type="string"
                    className="form-control"
                    name="oldQty"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="newQtyLabel" for="newQty">
                    New Qty
                  </Label>
                  <AvField
                    id="nomination-priority-newQty"
                    type="string"
                    className="form-control"
                    name="newQty"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least 0.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="subTypeLabel" for="subType">
                    Sub Type
                  </Label>
                  <AvField id="nomination-priority-subType" type="text" name="subType" />
                </AvGroup>
                <AvGroup>
                  <Label id="dirOfFlowLabel" for="dirOfFlow">
                    Dir Of Flow
                  </Label>
                  <AvField id="nomination-priority-dirOfFlow" type="text" name="dirOfFlow" />
                </AvGroup>
                <AvGroup>
                  <Label id="updaterLabel" for="updater">
                    Updater
                  </Label>
                  <AvField id="nomination-priority-updater" type="text" name="updater" />
                </AvGroup>
                <AvGroup>
                  <Label id="updateTimeStampLabel" for="updateTimeStamp">
                    Update Time Stamp
                  </Label>
                  <AvInput
                    id="nomination-priority-updateTimeStamp"
                    type="datetime-local"
                    className="form-control"
                    name="updateTimeStamp"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.nominationPriorityEntity.updateTimeStamp)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="businessUnitLabel" for="businessUnit">
                    Business Unit
                  </Label>
                  <AvField id="nomination-priority-businessUnit" type="text" name="businessUnit" />
                </AvGroup>
                <AvGroup>
                  <Label for="nomination.id">Nomination</Label>
                  <AvInput id="nomination-priority-nomination" type="select" className="form-control" name="nominationId">
                    <option value="" key="0" />
                    {nominations
                      ? nominations.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="activity.activityNbr">Activity</Label>
                  <AvInput id="nomination-priority-activity" type="select" className="form-control" name="activityId">
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
                  <AvInput id="nomination-priority-contract" type="select" className="form-control" name="contractId">
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
                <Button tag={Link} id="cancel-save" to="/entity/nomination-priority" replace color="info">
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
  nominations: storeState.nomination.entities,
  activities: storeState.activity.entities,
  contracts: storeState.contract.entities,
  nominationPriorityEntity: storeState.nominationPriority.entity,
  loading: storeState.nominationPriority.loading,
  updating: storeState.nominationPriority.updating,
  updateSuccess: storeState.nominationPriority.updateSuccess
});

const mapDispatchToProps = {
  getNominations,
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
)(NominationPriorityUpdate);
