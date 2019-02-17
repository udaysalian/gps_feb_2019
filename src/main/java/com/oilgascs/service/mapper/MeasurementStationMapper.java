package com.oilgascs.service.mapper;

import com.oilgascs.domain.*;
import com.oilgascs.service.dto.MeasurementStationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MeasurementStation and its DTO MeasurementStationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MeasurementStationMapper extends EntityMapper<MeasurementStationDTO, MeasurementStation> {



    default MeasurementStation fromId(Long id) {
        if (id == null) {
            return null;
        }
        MeasurementStation measurementStation = new MeasurementStation();
        measurementStation.setId(id);
        return measurementStation;
    }
}
