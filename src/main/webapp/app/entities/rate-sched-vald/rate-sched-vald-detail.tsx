import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './rate-sched-vald.reducer';
import { IRateSchedVald } from 'app/shared/model/rate-sched-vald.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRateSchedValdDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RateSchedValdDetail extends React.Component<IRateSchedValdDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { rateSchedValdEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            RateSchedVald [<b>{rateSchedValdEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="validType">Valid Type</span>
            </dt>
            <dd>{rateSchedValdEntity.validType}</dd>
            <dt>
              <span id="updater">Updater</span>
            </dt>
            <dd>{rateSchedValdEntity.updater}</dd>
            <dt>
              <span id="updateTimeStamp">Update Time Stamp</span>
            </dt>
            <dd>
              <TextFormat value={rateSchedValdEntity.updateTimeStamp} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="businessUnit">Business Unit</span>
            </dt>
            <dd>{rateSchedValdEntity.businessUnit}</dd>
            <dt>Rate Schd</dt>
            <dd>{rateSchedValdEntity.rateSchdRateScheduleCD ? rateSchedValdEntity.rateSchdRateScheduleCD : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/rate-sched-vald" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/rate-sched-vald/${rateSchedValdEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ rateSchedVald }: IRootState) => ({
  rateSchedValdEntity: rateSchedVald.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateSchedValdDetail);
