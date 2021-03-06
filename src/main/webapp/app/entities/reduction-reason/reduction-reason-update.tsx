import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './reduction-reason.reducer';
import { IReductionReason } from 'app/shared/model/reduction-reason.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReductionReasonUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IReductionReasonUpdateState {
  isNew: boolean;
}

export class ReductionReasonUpdate extends React.Component<IReductionReasonUpdateProps, IReductionReasonUpdateState> {
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
    if (errors.length === 0) {
      const { reductionReasonEntity } = this.props;
      const entity = {
        ...reductionReasonEntity,
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
    this.props.history.push('/entity/reduction-reason');
  };

  render() {
    const { reductionReasonEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gpsNetraApp.reductionReason.home.createOrEditLabel">Create or edit a ReductionReason</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : reductionReasonEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="reduction-reason-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="reasonLabel" for="reason">
                    Reason
                  </Label>
                  <AvField id="reduction-reason-reason" type="text" name="reason" />
                </AvGroup>
                <AvGroup>
                  <Label id="proprieteryReasonCodeLabel" for="proprieteryReasonCode">
                    Proprietery Reason Code
                  </Label>
                  <AvField id="reduction-reason-proprieteryReasonCode" type="text" name="proprieteryReasonCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="businessUnitLabel" for="businessUnit">
                    Business Unit
                  </Label>
                  <AvField
                    id="reduction-reason-businessUnit"
                    type="text"
                    name="businessUnit"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/reduction-reason" replace color="info">
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
  reductionReasonEntity: storeState.reductionReason.entity,
  loading: storeState.reductionReason.loading,
  updating: storeState.reductionReason.updating,
  updateSuccess: storeState.reductionReason.updateSuccess
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
)(ReductionReasonUpdate);
