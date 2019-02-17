import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './rate-sched.reducer';
import { IRateSched } from 'app/shared/model/rate-sched.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRateSchedDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RateSchedDetail extends React.Component<IRateSchedDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { rateSchedEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            RateSched [<b>{rateSchedEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="rsType">Rs Type</span>
            </dt>
            <dd>{rateSchedEntity.rsType}</dd>
            <dt>
              <span id="rateScheduleCD">Rate Schedule CD</span>
            </dt>
            <dd>{rateSchedEntity.rateScheduleCD}</dd>
            <dt>
              <span id="updater">Updater</span>
            </dt>
            <dd>{rateSchedEntity.updater}</dd>
            <dt>
              <span id="updateTimeStamp">Update Time Stamp</span>
            </dt>
            <dd>
              <TextFormat value={rateSchedEntity.updateTimeStamp} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="businessUnit">Business Unit</span>
            </dt>
            <dd>{rateSchedEntity.businessUnit}</dd>
          </dl>
          <Button tag={Link} to="/entity/rate-sched" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/rate-sched/${rateSchedEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ rateSched }: IRootState) => ({
  rateSchedEntity: rateSched.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateSchedDetail);
