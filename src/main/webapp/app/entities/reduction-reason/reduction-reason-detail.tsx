import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './reduction-reason.reducer';
import { IReductionReason } from 'app/shared/model/reduction-reason.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReductionReasonDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ReductionReasonDetail extends React.Component<IReductionReasonDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { reductionReasonEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ReductionReason [<b>{reductionReasonEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="reason">Reason</span>
            </dt>
            <dd>{reductionReasonEntity.reason}</dd>
            <dt>
              <span id="proprieteryReasonCode">Proprietery Reason Code</span>
            </dt>
            <dd>{reductionReasonEntity.proprieteryReasonCode}</dd>
            <dt>
              <span id="businessUnit">Business Unit</span>
            </dt>
            <dd>{reductionReasonEntity.businessUnit}</dd>
          </dl>
          <Button tag={Link} to="/entity/reduction-reason" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/reduction-reason/${reductionReasonEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ reductionReason }: IRootState) => ({
  reductionReasonEntity: reductionReason.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReductionReasonDetail);
