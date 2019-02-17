package com.oilgascs.service.mapper;

import com.oilgascs.domain.*;
import com.oilgascs.service.dto.ReductionReasonDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ReductionReason and its DTO ReductionReasonDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ReductionReasonMapper extends EntityMapper<ReductionReasonDTO, ReductionReason> {



    default ReductionReason fromId(Long id) {
        if (id == null) {
            return null;
        }
        ReductionReason reductionReason = new ReductionReason();
        reductionReason.setId(id);
        return reductionReason;
    }
}
