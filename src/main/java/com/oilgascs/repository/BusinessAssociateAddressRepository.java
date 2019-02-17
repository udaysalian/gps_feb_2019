package com.oilgascs.repository;

import com.oilgascs.domain.BusinessAssociateAddress;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BusinessAssociateAddress entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BusinessAssociateAddressRepository extends JpaRepository<BusinessAssociateAddress, Long> {

}
