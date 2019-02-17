package com.oilgascs.repository;

import com.oilgascs.domain.LocationBA;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LocationBA entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocationBARepository extends JpaRepository<LocationBA, Long> {

}
