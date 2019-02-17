package com.oilgascs.service.mapper;

import com.oilgascs.domain.*;
import com.oilgascs.service.dto.BusinessAssociateAddressDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BusinessAssociateAddress and its DTO BusinessAssociateAddressDTO.
 */
@Mapper(componentModel = "spring", uses = {BusinessAssociateMapper.class})
public interface BusinessAssociateAddressMapper extends EntityMapper<BusinessAssociateAddressDTO, BusinessAssociateAddress> {

    @Mapping(source = "businessAssociate.id", target = "businessAssociateId")
    BusinessAssociateAddressDTO toDto(BusinessAssociateAddress businessAssociateAddress);

    @Mapping(source = "businessAssociateId", target = "businessAssociate")
    BusinessAssociateAddress toEntity(BusinessAssociateAddressDTO businessAssociateAddressDTO);

    default BusinessAssociateAddress fromId(Long id) {
        if (id == null) {
            return null;
        }
        BusinessAssociateAddress businessAssociateAddress = new BusinessAssociateAddress();
        businessAssociateAddress.setId(id);
        return businessAssociateAddress;
    }
}
