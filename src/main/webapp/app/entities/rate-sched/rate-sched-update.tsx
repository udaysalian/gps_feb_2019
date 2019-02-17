import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './rate-sched.reducer';
import { IRateSched } from 'app/shared/model/rate-sched.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRateSchedUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRateSchedUpdateState {
  isNew: boolean;
}

export class RateSchedUpdate extends React.Component<IRateSchedUpdateProps, IRateSchedUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    values.updateTimeStamp = convertDateTimeToServer(values.updateTimeStamp);

    if (errors.length === 0) {
      const { rateSchedEntity } = this.props;
      const entity = {
        ...rateSchedEntity,
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
    this.props.history.push('/entity/rate-sched');
  };

  render() {
    const { rateSchedEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gpsNetraApp.rateSched.home.createOrEditLabel">Create or edit a RateSched</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : rateSchedEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="rate-sched-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="rsTypeLabel" for="rsType">
                    Rs Type
                  </Label>
                  <AvField
                    id="rate-sched-rsType"
                    type="text"
                    name="rsType"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="rateScheduleCDLabel" for="rateScheduleCD">
                    Rate Schedule CD
                  </Label>
                  <AvField
                    id="rate-sched-rateScheduleCD"
                    type="text"
                    name="rateScheduleCD"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updaterLabel" for="updater">
                    Updater
                  </Label>
                  <AvField id="rate-sched-updater" type="text" name="updater" />
                </AvGroup>
                <AvGroup>
                  <Label id="updateTimeStampLabel" for="updateTimeStamp">
                    Update Time Stamp
                  </Label>
                  <AvInput
                    id="rate-sched-updateTimeStamp"
                    type="datetime-local"
                    className="form-control"
                    name="updateTimeStamp"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.rateSchedEntity.updateTimeStamp)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="businessUnitLabel" for="businessUnit">
                    Business Unit
                  </Label>
                  <AvField
                    id="rate-sched-businessUnit"
                    type="text"
                    name="businessUnit"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/rate-sched" replace color="info">
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
  rateSchedEntity: storeState.rateSched.entity,
  loading: storeState.rateSched.loading,
  updating: storeState.rateSched.updating,
  updateSuccess: storeState.rateSched.updateSuccess
});

const mapDispatchToProps = {
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
)(RateSchedUpdate);
