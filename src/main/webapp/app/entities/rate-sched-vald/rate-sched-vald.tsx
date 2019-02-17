import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './rate-sched-vald.reducer';
import { IRateSchedVald } from 'app/shared/model/rate-sched-vald.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRateSchedValdProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class RateSchedVald extends React.Component<IRateSchedValdProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { rateSchedValdList, match } = this.props;
    return (
      <div>
        <h2 id="rate-sched-vald-heading">
          Rate Sched Valds
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Rate Sched Vald
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Valid Type</th>
                <th>Updater</th>
                <th>Update Time Stamp</th>
                <th>Business Unit</th>
                <th>Rate Schd</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rateSchedValdList.map((rateSchedVald, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${rateSchedVald.id}`} color="link" size="sm">
                      {rateSchedVald.id}
                    </Button>
                  </td>
                  <td>{rateSchedVald.validType}</td>
                  <td>{rateSchedVald.updater}</td>
                  <td>
                    <TextFormat type="date" value={rateSchedVald.updateTimeStamp} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{rateSchedVald.businessUnit}</td>
                  <td>
                    {rateSchedVald.rateSchdRateScheduleCD ? (
                      <Link to={`rate-sched/${rateSchedVald.rateSchdId}`}>{rateSchedVald.rateSchdRateScheduleCD}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${rateSchedVald.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${rateSchedVald.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${rateSchedVald.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ rateSchedVald }: IRootState) => ({
  rateSchedValdList: rateSchedVald.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateSchedVald);
