import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './business-unit.reducer';
import { IBusinessUnit } from 'app/shared/model/business-unit.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBusinessUnitProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class BusinessUnit extends React.Component<IBusinessUnitProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { businessUnitList, match } = this.props;
    return (
      <div>
        <h2 id="business-unit-heading">
          Business Units
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Business Unit
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Business Unit</th>
                <th>Business Associate Nbr</th>
                <th>Edi Pipe Id</th>
                <th>Company Logo</th>
                <th>Updater</th>
                <th>Update Timestamp</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {businessUnitList.map((businessUnit, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${businessUnit.id}`} color="link" size="sm">
                      {businessUnit.id}
                    </Button>
                  </td>
                  <td>{businessUnit.businessUnit}</td>
                  <td>{businessUnit.businessAssociateNbr}</td>
                  <td>{businessUnit.ediPipeId}</td>
                  <td>
                    {businessUnit.companyLogo ? (
                      <div>
                        <a onClick={openFile(businessUnit.companyLogoContentType, businessUnit.companyLogo)}>
                          <img
                            src={`data:${businessUnit.companyLogoContentType};base64,${businessUnit.companyLogo}`}
                            style={{ maxHeight: '30px' }}
                          />
                          &nbsp;
                        </a>
                        <span>
                          {businessUnit.companyLogoContentType}, {byteSize(businessUnit.companyLogo)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{businessUnit.updater}</td>
                  <td>
                    <TextFormat type="date" value={businessUnit.updateTimestamp} format={APP_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${businessUnit.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${businessUnit.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${businessUnit.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ businessUnit }: IRootState) => ({
  businessUnitList: businessUnit.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessUnit);
