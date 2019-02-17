import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './business-unit.reducer';
import { IBusinessUnit } from 'app/shared/model/business-unit.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBusinessUnitUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBusinessUnitUpdateState {
  isNew: boolean;
}

export class BusinessUnitUpdate extends React.Component<IBusinessUnitUpdateProps, IBusinessUnitUpdateState> {
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

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.updateTimestamp = convertDateTimeToServer(values.updateTimestamp);

    if (errors.length === 0) {
      const { businessUnitEntity } = this.props;
      const entity = {
        ...businessUnitEntity,
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
    this.props.history.push('/entity/business-unit');
  };

  render() {
    const { businessUnitEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { companyLogo, companyLogoContentType } = businessUnitEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gpsNetraApp.businessUnit.home.createOrEditLabel">Create or edit a BusinessUnit</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : businessUnitEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="business-unit-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="businessUnitLabel" for="businessUnit">
                    Business Unit
                  </Label>
                  <AvField id="business-unit-businessUnit" type="text" name="businessUnit" />
                </AvGroup>
                <AvGroup>
                  <Label id="businessAssociateNbrLabel" for="businessAssociateNbr">
                    Business Associate Nbr
                  </Label>
                  <AvField id="business-unit-businessAssociateNbr" type="text" name="businessAssociateNbr" />
                </AvGroup>
                <AvGroup>
                  <Label id="ediPipeIdLabel" for="ediPipeId">
                    Edi Pipe Id
                  </Label>
                  <AvField id="business-unit-ediPipeId" type="text" name="ediPipeId" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="companyLogoLabel" for="companyLogo">
                      Company Logo
                    </Label>
                    <br />
                    {companyLogo ? (
                      <div>
                        <a onClick={openFile(companyLogoContentType, companyLogo)}>
                          <img src={`data:${companyLogoContentType};base64,${companyLogo}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {companyLogoContentType}, {byteSize(companyLogo)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('companyLogo')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_companyLogo" type="file" onChange={this.onBlobChange(true, 'companyLogo')} accept="image/*" />
                    <AvInput type="hidden" name="companyLogo" value={companyLogo} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="updaterLabel" for="updater">
                    Updater
                  </Label>
                  <AvField id="business-unit-updater" type="text" name="updater" />
                </AvGroup>
                <AvGroup>
                  <Label id="updateTimestampLabel" for="updateTimestamp">
                    Update Timestamp
                  </Label>
                  <AvInput
                    id="business-unit-updateTimestamp"
                    type="datetime-local"
                    className="form-control"
                    name="updateTimestamp"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.businessUnitEntity.updateTimestamp)}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/business-unit" replace color="info">
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
  businessUnitEntity: storeState.businessUnit.entity,
  loading: storeState.businessUnit.loading,
  updating: storeState.businessUnit.updating,
  updateSuccess: storeState.businessUnit.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessUnitUpdate);
