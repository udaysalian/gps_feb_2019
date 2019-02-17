package com.oilgascs.repository;

import com.oilgascs.domain.NominationPriority;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NominationPriority entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NominationPriorityRepository extends JpaRepository<NominationPriority, Long> {

}
