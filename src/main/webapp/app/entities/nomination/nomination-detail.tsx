import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './nomination.reducer';
import { INomination } from 'app/shared/model/nomination.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INominationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NominationDetail extends React.Component<INominationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { nominationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Nomination [<b>{nominationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="gasDate">Gas Date</span>
            </dt>
            <dd>
              <TextFormat value={nominationEntity.gasDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="requestedRcptQty">Requested Rcpt Qty</span>
            </dt>
            <dd>{nominationEntity.requestedRcptQty}</dd>
            <dt>
              <span id="reqestedDlvryQty">Reqested Dlvry Qty</span>
            </dt>
            <dd>{nominationEntity.reqestedDlvryQty}</dd>
            <dt>
              <span id="scheduledRcptQty">Scheduled Rcpt Qty</span>
            </dt>
            <dd>{nominationEntity.scheduledRcptQty}</dd>
            <dt>
              <span id="scheduledDlvryQty">Scheduled Dlvry Qty</span>
            </dt>
            <dd>{nominationEntity.scheduledDlvryQty}</dd>
            <dt>
              <span id="requestStatus">Request Status</span>
            </dt>
            <dd>{nominationEntity.requestStatus}</dd>
            <dt>
              <span id="updater">Updater</span>
            </dt>
            <dd>{nominationEntity.updater}</dd>
            <dt>
              <span id="updateTimeStamp">Update Time Stamp</span>
            </dt>
            <dd>
              <TextFormat value={nominationEntity.updateTimeStamp} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="businessUnit">Business Unit</span>
            </dt>
            <dd>{nominationEntity.businessUnit}</dd>
            <dt>Activity</dt>
            <dd>{nominationEntity.activityActivityNbr ? nominationEntity.activityActivityNbr : ''}</dd>
            <dt>Contract</dt>
            <dd>{nominationEntity.contractContrId ? nominationEntity.contractContrId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/nomination" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/nomination/${nominationEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ nomination }: IRootState) => ({
  nominationEntity: nomination.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NominationDetail);
