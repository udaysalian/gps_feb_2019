import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRateSched } from 'app/shared/model/rate-sched.model';
import { getEntities as getRateScheds } from 'app/entities/rate-sched/rate-sched.reducer';
import { getEntity, updateEntity, createEntity, reset } from './rate-sched-vald.reducer';
import { IRateSchedVald } from 'app/shared/model/rate-sched-vald.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRateSchedValdUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRateSchedValdUpdateState {
  isNew: boolean;
  rateSchdId: string;
}

export class RateSchedValdUpdate extends React.Component<IRateSchedValdUpdateProps, IRateSchedValdUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      rateSchdId: '0',
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

    this.props.getRateScheds();
  }

  saveEntity = (event, errors, values) => {
    values.updateTimeStamp = convertDateTimeToServer(values.updateTimeStamp);

    if (errors.length === 0) {
      const { rateSchedValdEntity } = this.props;
      const entity = {
        ...rateSchedValdEntity,
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
    this.props.history.push('/entity/rate-sched-vald');
  };

  render() {
    const { rateSchedValdEntity, rateScheds, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gpsNetraApp.rateSchedVald.home.createOrEditLabel">Create or edit a RateSchedVald</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : rateSchedValdEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="rate-sched-vald-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="validTypeLabel" for="validType">
                    Valid Type
                  </Label>
                  <AvField id="rate-sched-vald-validType" type="text" name="validType" />
                </AvGroup>
                <AvGroup>
                  <Label id="updaterLabel" for="updater">
                    Updater
                  </Label>
                  <AvField id="rate-sched-vald-updater" type="text" name="updater" />
                </AvGroup>
                <AvGroup>
                  <Label id="updateTimeStampLabel" for="updateTimeStamp">
                    Update Time Stamp
                  </Label>
                  <AvInput
                    id="rate-sched-vald-updateTimeStamp"
                    type="datetime-local"
                    className="form-control"
                    name="updateTimeStamp"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.rateSchedValdEntity.updateTimeStamp)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="businessUnitLabel" for="businessUnit">
                    Business Unit
                  </Label>
                  <AvField id="rate-sched-vald-businessUnit" type="text" name="businessUnit" />
                </AvGroup>
                <AvGroup>
                  <Label for="rateSchd.rateScheduleCD">Rate Schd</Label>
                  <AvInput id="rate-sched-vald-rateSchd" type="select" className="form-control" name="rateSchdId">
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
                <Button tag={Link} id="cancel-save" to="/entity/rate-sched-vald" replace color="info">
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
  rateScheds: storeState.rateSched.entities,
  rateSchedValdEntity: storeState.rateSchedVald.entity,
  loading: storeState.rateSchedVald.loading,
  updating: storeState.rateSchedVald.updating,
  updateSuccess: storeState.rateSchedVald.updateSuccess
});

const mapDispatchToProps = {
  getRateScheds,
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
)(RateSchedValdUpdate);
