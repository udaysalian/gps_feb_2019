import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './reduction-reason.reducer';
import { IReductionReason } from 'app/shared/model/reduction-reason.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReductionReasonProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ReductionReason extends React.Component<IReductionReasonProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { reductionReasonList, match } = this.props;
    return (
      <div>
        <h2 id="reduction-reason-heading">
          Reduction Reasons
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Reduction Reason
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Reason</th>
                <th>Proprietery Reason Code</th>
                <th>Business Unit</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {reductionReasonList.map((reductionReason, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${reductionReason.id}`} color="link" size="sm">
                      {reductionReason.id}
                    </Button>
                  </td>
                  <td>{reductionReason.reason}</td>
                  <td>{reductionReason.proprieteryReasonCode}</td>
                  <td>{reductionReason.businessUnit}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${reductionReason.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${reductionReason.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${reductionReason.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ reductionReason }: IRootState) => ({
  reductionReasonList: reductionReason.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReductionReason);
