import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './activity.reducer';
import { IActivity } from 'app/shared/model/activity.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IActivityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ActivityDetail extends React.Component<IActivityDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { activityEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Activity [<b>{activityEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="contrId">Contr Id</span>
            </dt>
            <dd>{activityEntity.contrId}</dd>
            <dt>
              <span id="activityNbr">Activity Nbr</span>
            </dt>
            <dd>{activityEntity.activityNbr}</dd>
            <dt>
              <span id="transactionType">Transaction Type</span>
            </dt>
            <dd>{activityEntity.transactionType}</dd>
            <dt>
              <span id="updater">Updater</span>
            </dt>
            <dd>{activityEntity.updater}</dd>
            <dt>
              <span id="updateTimeStamp">Update Time Stamp</span>
            </dt>
            <dd>
              <TextFormat value={activityEntity.updateTimeStamp} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="businessUnit">Business Unit</span>
            </dt>
            <dd>{activityEntity.businessUnit}</dd>
            <dt>Upstream BA</dt>
            <dd>{activityEntity.upstreamBABaAbbr ? activityEntity.upstreamBABaAbbr : ''}</dd>
            <dt>Downstream BA</dt>
            <dd>{activityEntity.downstreamBABaAbbr ? activityEntity.downstreamBABaAbbr : ''}</dd>
            <dt>Rt Sched</dt>
            <dd>{activityEntity.rtSchedRateScheduleCD ? activityEntity.rtSchedRateScheduleCD : ''}</dd>
            <dt>Receipt Location</dt>
            <dd>{activityEntity.receiptLocationLocationNbr ? activityEntity.receiptLocationLocationNbr : ''}</dd>
            <dt>Delivery Location</dt>
            <dd>{activityEntity.deliveryLocationLocationNbr ? activityEntity.deliveryLocationLocationNbr : ''}</dd>
            <dt>Upstream Contract</dt>
            <dd>{activityEntity.upstreamContractContrId ? activityEntity.upstreamContractContrId : ''}</dd>
            <dt>Downstream Contract</dt>
            <dd>{activityEntity.downstreamContractContrId ? activityEntity.downstreamContractContrId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/activity" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/activity/${activityEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ activity }: IRootState) => ({
  activityEntity: activity.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityDetail);
