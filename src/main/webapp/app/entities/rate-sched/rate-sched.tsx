import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './rate-sched.reducer';
import { IRateSched } from 'app/shared/model/rate-sched.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRateSchedProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class RateSched extends React.Component<IRateSchedProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { rateSchedList, match } = this.props;
    return (
      <div>
        <h2 id="rate-sched-heading">
          Rate Scheds
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Rate Sched
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Rs Type</th>
                <th>Rate Schedule CD</th>
                <th>Updater</th>
                <th>Update Time Stamp</th>
                <th>Business Unit</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rateSchedList.map((rateSched, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${rateSched.id}`} color="link" size="sm">
                      {rateSched.id}
                    </Button>
                  </td>
                  <td>{rateSched.rsType}</td>
                  <td>{rateSched.rateScheduleCD}</td>
                  <td>{rateSched.updater}</td>
                  <td>
                    <TextFormat type="date" value={rateSched.updateTimeStamp} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{rateSched.businessUnit}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${rateSched.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${rateSched.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${rateSched.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ rateSched }: IRootState) => ({
  rateSchedList: rateSched.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateSched);
