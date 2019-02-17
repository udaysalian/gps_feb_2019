import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './nomination.reducer';
import { INomination } from 'app/shared/model/nomination.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INominationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Nomination extends React.Component<INominationProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { nominationList, match } = this.props;
    return (
      <div>
        <h2 id="nomination-heading">
          Nominations
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Nomination
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Gas Date</th>
                <th>Requested Rcpt Qty</th>
                <th>Reqested Dlvry Qty</th>
                <th>Scheduled Rcpt Qty</th>
                <th>Scheduled Dlvry Qty</th>
                <th>Request Status</th>
                <th>Updater</th>
                <th>Update Time Stamp</th>
                <th>Business Unit</th>
                <th>Activity</th>
                <th>Contract</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {nominationList.map((nomination, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${nomination.id}`} color="link" size="sm">
                      {nomination.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={nomination.gasDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{nomination.requestedRcptQty}</td>
                  <td>{nomination.reqestedDlvryQty}</td>
                  <td>{nomination.scheduledRcptQty}</td>
                  <td>{nomination.scheduledDlvryQty}</td>
                  <td>{nomination.requestStatus}</td>
                  <td>{nomination.updater}</td>
                  <td>
                    <TextFormat type="date" value={nomination.updateTimeStamp} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{nomination.businessUnit}</td>
                  <td>
                    {nomination.activityActivityNbr ? (
                      <Link to={`activity/${nomination.activityId}`}>{nomination.activityActivityNbr}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {nomination.contractContrId ? <Link to={`contract/${nomination.contractId}`}>{nomination.contractContrId}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${nomination.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${nomination.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${nomination.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ nomination }: IRootState) => ({
  nominationList: nomination.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nomination);
