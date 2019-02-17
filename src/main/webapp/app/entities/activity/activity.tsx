import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './activity.reducer';
import { IActivity } from 'app/shared/model/activity.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IActivityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Activity extends React.Component<IActivityProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { activityList, match } = this.props;
    return (
      <div>
        <h2 id="activity-heading">
          Activities
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Activity
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Contr Id</th>
                <th>Activity Nbr</th>
                <th>Transaction Type</th>
                <th>Updater</th>
                <th>Update Time Stamp</th>
                <th>Business Unit</th>
                <th>Upstream BA</th>
                <th>Downstream BA</th>
                <th>Rt Sched</th>
                <th>Receipt Location</th>
                <th>Delivery Location</th>
                <th>Upstream Contract</th>
                <th>Downstream Contract</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {activityList.map((activity, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${activity.id}`} color="link" size="sm">
                      {activity.id}
                    </Button>
                  </td>
                  <td>{activity.contrId}</td>
                  <td>{activity.activityNbr}</td>
                  <td>{activity.transactionType}</td>
                  <td>{activity.updater}</td>
                  <td>
                    <TextFormat type="date" value={activity.updateTimeStamp} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{activity.businessUnit}</td>
                  <td>
                    {activity.upstreamBABaAbbr ? (
                      <Link to={`business-associate/${activity.upstreamBAId}`}>{activity.upstreamBABaAbbr}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {activity.downstreamBABaAbbr ? (
                      <Link to={`business-associate/${activity.downstreamBAId}`}>{activity.downstreamBABaAbbr}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {activity.rtSchedRateScheduleCD ? (
                      <Link to={`rate-sched/${activity.rtSchedId}`}>{activity.rtSchedRateScheduleCD}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {activity.receiptLocationLocationNbr ? (
                      <Link to={`measurement-station/${activity.receiptLocationId}`}>{activity.receiptLocationLocationNbr}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {activity.deliveryLocationLocationNbr ? (
                      <Link to={`measurement-station/${activity.deliveryLocationId}`}>{activity.deliveryLocationLocationNbr}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {activity.upstreamContractContrId ? (
                      <Link to={`contract/${activity.upstreamContractId}`}>{activity.upstreamContractContrId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {activity.downstreamContractContrId ? (
                      <Link to={`contract/${activity.downstreamContractId}`}>{activity.downstreamContractContrId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${activity.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${activity.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${activity.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ activity }: IRootState) => ({
  activityList: activity.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
