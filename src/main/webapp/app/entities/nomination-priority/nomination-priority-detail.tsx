import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './nomination-priority.reducer';
import { INominationPriority } from 'app/shared/model/nomination-priority.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INominationPriorityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NominationPriorityDetail extends React.Component<INominationPriorityDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { nominationPriorityEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            NominationPriority [<b>{nominationPriorityEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="gasDate">Gas Date</span>
            </dt>
            <dd>
              <TextFormat value={nominationPriorityEntity.gasDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="prtyTp">Prty Tp</span>
            </dt>
            <dd>{nominationPriorityEntity.prtyTp}</dd>
            <dt>
              <span id="oldQty">Old Qty</span>
            </dt>
            <dd>{nominationPriorityEntity.oldQty}</dd>
            <dt>
              <span id="newQty">New Qty</span>
            </dt>
            <dd>{nominationPriorityEntity.newQty}</dd>
            <dt>
              <span id="subType">Sub Type</span>
            </dt>
            <dd>{nominationPriorityEntity.subType}</dd>
            <dt>
              <span id="dirOfFlow">Dir Of Flow</span>
            </dt>
            <dd>{nominationPriorityEntity.dirOfFlow}</dd>
            <dt>
              <span id="updater">Updater</span>
            </dt>
            <dd>{nominationPriorityEntity.updater}</dd>
            <dt>
              <span id="updateTimeStamp">Update Time Stamp</span>
            </dt>
            <dd>
              <TextFormat value={nominationPriorityEntity.updateTimeStamp} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="businessUnit">Business Unit</span>
            </dt>
            <dd>{nominationPriorityEntity.businessUnit}</dd>
            <dt>Nomination</dt>
            <dd>{nominationPriorityEntity.nominationId ? nominationPriorityEntity.nominationId : ''}</dd>
            <dt>Activity</dt>
            <dd>{nominationPriorityEntity.activityActivityNbr ? nominationPriorityEntity.activityActivityNbr : ''}</dd>
            <dt>Contract</dt>
            <dd>{nominationPriorityEntity.contractContrId ? nominationPriorityEntity.contractContrId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/nomination-priority" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/nomination-priority/${nominationPriorityEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ nominationPriority }: IRootState) => ({
  nominationPriorityEntity: nominationPriority.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NominationPriorityDetail);
