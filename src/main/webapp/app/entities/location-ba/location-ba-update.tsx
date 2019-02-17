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
import { getEntity, updateEntity, createEntity, reset } from './location-ba.reducer';
import { ILocationBA } from 'app/shared/model/location-ba.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILocationBAUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILocationBAUpdateState {
  isNew: boolean;
  busAssocId: string;
}

export class LocationBAUpdate extends React.Component<ILocationBAUpdateProps, ILocationBAUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      busAssocId: '0',
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
    values.updateTimestamp = convertDateTimeToServer(values.updateTimestamp);

    if (errors.length === 0) {
      const { locationBAEntity } = this.props;
      const entity = {
        ...locationBAEntity,
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
    this.props.history.push('/entity/location-ba');
  };

  render() {
    const { locationBAEntity, businessAssociates, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gpsNetraApp.locationBA.home.createOrEditLabel">Create or edit a LocationBA</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : locationBAEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="location-ba-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="locationNbrLabel" for="locationNbr">
                    Location Nbr
                  </Label>
                  <AvField
                    id="location-ba-locationNbr"
                    type="text"
                    name="locationNbr"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="locationBATypeLabel" for="locationBAType">
                    Location BA Type
                  </Label>
                  <AvField id="location-ba-locationBAType" type="text" name="locationBAType" />
                </AvGroup>
                <AvGroup>
                  <Label id="businessUnitLabel" for="businessUnit">
                    Business Unit
                  </Label>
                  <AvField
                    id="location-ba-businessUnit"
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
                  <AvField id="location-ba-updater" type="text" name="updater" />
                </AvGroup>
                <AvGroup>
                  <Label id="updateTimestampLabel" for="updateTimestamp">
                    Update Timestamp
                  </Label>
                  <AvInput
                    id="location-ba-updateTimestamp"
                    type="datetime-local"
                    className="form-control"
                    name="updateTimestamp"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.locationBAEntity.updateTimestamp)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="busAssoc.baAbbr">Bus Assoc</Label>
                  <AvInput id="location-ba-busAssoc" type="select" className="form-control" name="busAssocId">
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
                <Button tag={Link} id="cancel-save" to="/entity/location-ba" replace color="info">
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
  locationBAEntity: storeState.locationBA.entity,
  loading: storeState.locationBA.loading,
  updating: storeState.locationBA.updating,
  updateSuccess: storeState.locationBA.updateSuccess
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
)(LocationBAUpdate);
