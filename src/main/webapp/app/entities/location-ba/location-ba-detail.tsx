import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './location-ba.reducer';
import { ILocationBA } from 'app/shared/model/location-ba.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocationBADetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LocationBADetail extends React.Component<ILocationBADetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { locationBAEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            LocationBA [<b>{locationBAEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="locationNbr">Location Nbr</span>
            </dt>
            <dd>{locationBAEntity.locationNbr}</dd>
            <dt>
              <span id="locationBAType">Location BA Type</span>
            </dt>
            <dd>{locationBAEntity.locationBAType}</dd>
            <dt>
              <span id="businessUnit">Business Unit</span>
            </dt>
            <dd>{locationBAEntity.businessUnit}</dd>
            <dt>
              <span id="updater">Updater</span>
            </dt>
            <dd>{locationBAEntity.updater}</dd>
            <dt>
              <span id="updateTimestamp">Update Timestamp</span>
            </dt>
            <dd>
              <TextFormat value={locationBAEntity.updateTimestamp} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Bus Assoc</dt>
            <dd>{locationBAEntity.busAssocBaAbbr ? locationBAEntity.busAssocBaAbbr : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/location-ba" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/location-ba/${locationBAEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ locationBA }: IRootState) => ({
  locationBAEntity: locationBA.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationBADetail);
