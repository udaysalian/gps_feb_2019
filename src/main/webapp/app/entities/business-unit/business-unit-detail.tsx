import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './business-unit.reducer';
import { IBusinessUnit } from 'app/shared/model/business-unit.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBusinessUnitDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BusinessUnitDetail extends React.Component<IBusinessUnitDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { businessUnitEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            BusinessUnit [<b>{businessUnitEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="businessUnit">Business Unit</span>
            </dt>
            <dd>{businessUnitEntity.businessUnit}</dd>
            <dt>
              <span id="businessAssociateNbr">Business Associate Nbr</span>
            </dt>
            <dd>{businessUnitEntity.businessAssociateNbr}</dd>
            <dt>
              <span id="ediPipeId">Edi Pipe Id</span>
            </dt>
            <dd>{businessUnitEntity.ediPipeId}</dd>
            <dt>
              <span id="companyLogo">Company Logo</span>
            </dt>
            <dd>
              {businessUnitEntity.companyLogo ? (
                <div>
                  <a onClick={openFile(businessUnitEntity.companyLogoContentType, businessUnitEntity.companyLogo)}>
                    <img
                      src={`data:${businessUnitEntity.companyLogoContentType};base64,${businessUnitEntity.companyLogo}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {businessUnitEntity.companyLogoContentType}, {byteSize(businessUnitEntity.companyLogo)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="updater">Updater</span>
            </dt>
            <dd>{businessUnitEntity.updater}</dd>
            <dt>
              <span id="updateTimestamp">Update Timestamp</span>
            </dt>
            <dd>
              <TextFormat value={businessUnitEntity.updateTimestamp} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/business-unit" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/business-unit/${businessUnitEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ businessUnit }: IRootState) => ({
  businessUnitEntity: businessUnit.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessUnitDetail);
