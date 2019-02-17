package com.oilgascs.service.mapper;

import com.oilgascs.domain.*;
import com.oilgascs.service.dto.BusinessAssociateDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BusinessAssociate and its DTO BusinessAssociateDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BusinessAssociateMapper extends EntityMapper<BusinessAssociateDTO, BusinessAssociate> {


    @Mapping(target = "contracts", ignore = true)
    @Mapping(target = "businessAssociateAddresses", ignore = true)
    BusinessAssociate toEntity(BusinessAssociateDTO businessAssociateDTO);

    default BusinessAssociate fromId(Long id) {
        if (id == null) {
            return null;
        }
        BusinessAssociate businessAssociate = new BusinessAssociate();
        businessAssociate.setId(id);
        return businessAssociate;
    }
}
