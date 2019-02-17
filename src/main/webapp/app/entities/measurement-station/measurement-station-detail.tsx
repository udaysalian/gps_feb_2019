import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './measurement-station.reducer';
import { IMeasurementStation } from 'app/shared/model/measurement-station.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasurementStationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MeasurementStationDetail extends React.Component<IMeasurementStationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { measurementStationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            MeasurementStation [<b>{measurementStationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="locationNbr">Location Nbr</span>
            </dt>
            <dd>{measurementStationEntity.locationNbr}</dd>
            <dt>
              <span id="milepostNbr">Milepost Nbr</span>
            </dt>
            <dd>{measurementStationEntity.milepostNbr}</dd>
            <dt>
              <span id="upstreamPipeNode">Upstream Pipe Node</span>
            </dt>
            <dd>{measurementStationEntity.upstreamPipeNode}</dd>
            <dt>
              <span id="downStreamPipeNode">Down Stream Pipe Node</span>
            </dt>
            <dd>{measurementStationEntity.downStreamPipeNode}</dd>
            <dt>
              <span id="businessUnit">Business Unit</span>
            </dt>
            <dd>{measurementStationEntity.businessUnit}</dd>
            <dt>
              <span id="updater">Updater</span>
            </dt>
            <dd>{measurementStationEntity.updater}</dd>
            <dt>
              <span id="updateTimestamp">Update Timestamp</span>
            </dt>
            <dd>
              <TextFormat value={measurementStationEntity.updateTimestamp} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/measurement-station" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/measurement-station/${measurementStationEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ measurementStation }: IRootState) => ({
  measurementStationEntity: measurementStation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeasurementStationDetail);
