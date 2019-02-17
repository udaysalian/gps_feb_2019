package com.oilgascs.service.mapper;

import com.oilgascs.domain.*;
import com.oilgascs.service.dto.BusinessUnitDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BusinessUnit and its DTO BusinessUnitDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BusinessUnitMapper extends EntityMapper<BusinessUnitDTO, BusinessUnit> {



    default BusinessUnit fromId(Long id) {
        if (id == null) {
            return null;
        }
        BusinessUnit businessUnit = new BusinessUnit();
        businessUnit.setId(id);
        return businessUnit;
    }
}
