package com.oilgascs.repository;

import com.oilgascs.domain.Nomination;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Nomination entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NominationRepository extends JpaRepository<Nomination, Long> {

}
