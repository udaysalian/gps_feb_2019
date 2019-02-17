import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './measurement-station.reducer';
import { IMeasurementStation } from 'app/shared/model/measurement-station.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMeasurementStationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMeasurementStationUpdateState {
  isNew: boolean;
}

export class MeasurementStationUpdate extends React.Component<IMeasurementStationUpdateProps, IMeasurementStationUpdateState> {
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
    values.updateTimestamp = convertDateTimeToServer(values.updateTimestamp);

    if (errors.length === 0) {
      const { measurementStationEntity } = this.props;
      const entity = {
        ...measurementStationEntity,
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
    this.props.history.push('/entity/measurement-station');
  };

  render() {
    const { measurementStationEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gpsNetraApp.measurementStation.home.createOrEditLabel">Create or edit a MeasurementStation</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : measurementStationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="measurement-station-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="locationNbrLabel" for="locationNbr">
                    Location Nbr
                  </Label>
                  <AvField
                    id="measurement-station-locationNbr"
                    type="text"
                    name="locationNbr"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="milepostNbrLabel" for="milepostNbr">
                    Milepost Nbr
                  </Label>
                  <AvField id="measurement-station-milepostNbr" type="string" className="form-control" name="milepostNbr" />
                </AvGroup>
                <AvGroup>
                  <Label id="upstreamPipeNodeLabel" for="upstreamPipeNode">
                    Upstream Pipe Node
                  </Label>
                  <AvField id="measurement-station-upstreamPipeNode" type="text" name="upstreamPipeNode" />
                </AvGroup>
                <AvGroup>
                  <Label id="downStreamPipeNodeLabel" for="downStreamPipeNode">
                    Down Stream Pipe Node
                  </Label>
                  <AvField id="measurement-station-downStreamPipeNode" type="text" name="downStreamPipeNode" />
                </AvGroup>
                <AvGroup>
                  <Label id="businessUnitLabel" for="businessUnit">
                    Business Unit
                  </Label>
                  <AvField
                    id="measurement-station-businessUnit"
                    type="text"
                    name="businessUnit"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updaterLabel" for="updater">
                    Updater
                  </Label>
                  <AvField id="measurement-station-updater" type="text" name="updater" />
                </AvGroup>
                <AvGroup>
                  <Label id="updateTimestampLabel" for="updateTimestamp">
                    Update Timestamp
                  </Label>
                  <AvInput
                    id="measurement-station-updateTimestamp"
                    type="datetime-local"
                    className="form-control"
                    name="updateTimestamp"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.measurementStationEntity.updateTimestamp)}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/measurement-station" replace color="info">
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
  measurementStationEntity: storeState.measurementStation.entity,
  loading: storeState.measurementStation.loading,
  updating: storeState.measurementStation.updating,
  updateSuccess: storeState.measurementStation.updateSuccess
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
)(MeasurementStationUpdate);
