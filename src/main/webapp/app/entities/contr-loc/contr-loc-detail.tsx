import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './contr-loc.reducer';
import { IContrLoc } from 'app/shared/model/contr-loc.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContrLocDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ContrLocDetail extends React.Component<IContrLocDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { contrLocEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ContrLoc [<b>{contrLocEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="type">Type</span>
            </dt>
            <dd>{contrLocEntity.type}</dd>
            <dt>
              <span id="quantity">Quantity</span>
            </dt>
            <dd>{contrLocEntity.quantity}</dd>
            <dt>
              <span id="effectiveFromDate">Effective From Date</span>
            </dt>
            <dd>
              <TextFormat value={contrLocEntity.effectiveFromDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="effectiveToDate">Effective To Date</span>
            </dt>
            <dd>
              <TextFormat value={contrLocEntity.effectiveToDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updater">Updater</span>
            </dt>
            <dd>{contrLocEntity.updater}</dd>
            <dt>
              <span id="updateTimeStamp">Update Time Stamp</span>
            </dt>
            <dd>
              <TextFormat value={contrLocEntity.updateTimeStamp} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="businessUnit">Business Unit</span>
            </dt>
            <dd>{contrLocEntity.businessUnit}</dd>
            <dt>Contract</dt>
            <dd>{contrLocEntity.contractId ? contrLocEntity.contractId : ''}</dd>
            <dt>Location</dt>
            <dd>{contrLocEntity.locationLocationNbr ? contrLocEntity.locationLocationNbr : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/contr-loc" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/contr-loc/${contrLocEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ contrLoc }: IRootState) => ({
  contrLocEntity: contrLoc.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContrLocDetail);
