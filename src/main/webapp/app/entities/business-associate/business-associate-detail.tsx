import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './business-associate.reducer';
import { IBusinessAssociate } from 'app/shared/model/business-associate.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBusinessAssociateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BusinessAssociateDetail extends React.Component<IBusinessAssociateDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { businessAssociateEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            BusinessAssociate [<b>{businessAssociateEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="baName">Ba Name</span>
            </dt>
            <dd>{businessAssociateEntity.baName}</dd>
            <dt>
              <span id="baAbbr">Ba Abbr</span>
            </dt>
            <dd>{businessAssociateEntity.baAbbr}</dd>
            <dt>
              <span id="baNbr">Ba Nbr</span>
            </dt>
            <dd>{businessAssociateEntity.baNbr}</dd>
            <dt>
              <span id="baDunsNbr">Ba Duns Nbr</span>
            </dt>
            <dd>{businessAssociateEntity.baDunsNbr}</dd>
          </dl>
          <Button tag={Link} to="/entity/business-associate" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/business-associate/${businessAssociateEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ businessAssociate }: IRootState) => ({
  businessAssociateEntity: businessAssociate.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessAssociateDetail);
