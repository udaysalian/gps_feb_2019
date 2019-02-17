import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './nomination-priority.reducer';
import { INominationPriority } from 'app/shared/model/nomination-priority.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INominationPriorityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class NominationPriority extends React.Component<INominationPriorityProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { nominationPriorityList, match } = this.props;
    return (
      <div>
        <h2 id="nomination-priority-heading">
          Nomination Priorities
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Nomination Priority
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Gas Date</th>
                <th>Prty Tp</th>
                <th>Old Qty</th>
                <th>New Qty</th>
                <th>Sub Type</th>
                <th>Dir Of Flow</th>
                <th>Updater</th>
                <th>Update Time Stamp</th>
                <th>Business Unit</th>
                <th>Nomination</th>
                <th>Activity</th>
                <th>Contract</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {nominationPriorityList.map((nominationPriority, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${nominationPriority.id}`} color="link" size="sm">
                      {nominationPriority.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={nominationPriority.gasDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{nominationPriority.prtyTp}</td>
                  <td>{nominationPriority.oldQty}</td>
                  <td>{nominationPriority.newQty}</td>
                  <td>{nominationPriority.subType}</td>
                  <td>{nominationPriority.dirOfFlow}</td>
                  <td>{nominationPriority.updater}</td>
                  <td>
                    <TextFormat type="date" value={nominationPriority.updateTimeStamp} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{nominationPriority.businessUnit}</td>
                  <td>
                    {nominationPriority.nominationId ? (
                      <Link to={`nomination/${nominationPriority.nominationId}`}>{nominationPriority.nominationId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {nominationPriority.activityActivityNbr ? (
                      <Link to={`activity/${nominationPriority.activityId}`}>{nominationPriority.activityActivityNbr}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {nominationPriority.contractContrId ? (
                      <Link to={`contract/${nominationPriority.contractId}`}>{nominationPriority.contractContrId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${nominationPriority.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${nominationPriority.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${nominationPriority.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ nominationPriority }: IRootState) => ({
  nominationPriorityList: nominationPriority.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NominationPriority);
