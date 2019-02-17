package com.oilgascs.repository;

import com.oilgascs.domain.ReductionReason;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReductionReason entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReductionReasonRepository extends JpaRepository<ReductionReason, Long> {

}
