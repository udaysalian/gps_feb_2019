import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './measurement-station.reducer';
import { IMeasurementStation } from 'app/shared/model/measurement-station.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasurementStationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class MeasurementStation extends React.Component<IMeasurementStationProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { measurementStationList, match } = this.props;
    return (
      <div>
        <h2 id="measurement-station-heading">
          Measurement Stations
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Measurement Station
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Location Nbr</th>
                <th>Milepost Nbr</th>
                <th>Upstream Pipe Node</th>
                <th>Down Stream Pipe Node</th>
                <th>Business Unit</th>
                <th>Updater</th>
                <th>Update Timestamp</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {measurementStationList.map((measurementStation, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${measurementStation.id}`} color="link" size="sm">
                      {measurementStation.id}
                    </Button>
                  </td>
                  <td>{measurementStation.locationNbr}</td>
                  <td>{measurementStation.milepostNbr}</td>
                  <td>{measurementStation.upstreamPipeNode}</td>
                  <td>{measurementStation.downStreamPipeNode}</td>
                  <td>{measurementStation.businessUnit}</td>
                  <td>{measurementStation.updater}</td>
                  <td>
                    <TextFormat type="date" value={measurementStation.updateTimestamp} format={APP_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${measurementStation.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${measurementStation.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${measurementStation.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ measurementStation }: IRootState) => ({
  measurementStationList: measurementStation.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeasurementStation);
