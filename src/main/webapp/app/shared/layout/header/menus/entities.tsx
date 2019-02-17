import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/nomination">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Nomination
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/reduction-reason">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Reduction Reason
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/activity">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Activity
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/rate-sched">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Rate Sched
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/rate-sched-vald">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Rate Sched Vald
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/nomination-priority">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Nomination Priority
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/contract">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Contract
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/contr-loc">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Contr Loc
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/business-associate">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Business Associate
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/business-associate-address">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Business Associate Address
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/measurement-station">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Measurement Station
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/location-ba">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Location Ba
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/contact">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Contact
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/business-unit">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Business Unit
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/business-associate-contact">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Business Associate Contact
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
