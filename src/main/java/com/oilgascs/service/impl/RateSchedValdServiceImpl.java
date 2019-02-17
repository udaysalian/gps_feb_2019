package com.oilgascs.service.impl;

import com.oilgascs.service.RateSchedValdService;
import com.oilgascs.domain.RateSchedVald;
import com.oilgascs.repository.RateSchedValdRepository;
import com.oilgascs.service.dto.RateSchedValdDTO;
import com.oilgascs.service.mapper.RateSchedValdMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing RateSchedVald.
 */
@Service
@Transactional
public class RateSchedValdServiceImpl implements RateSchedValdService {

    private final Logger log = LoggerFactory.getLogger(RateSchedValdServiceImpl.class);

    private final RateSchedValdRepository rateSchedValdRepository;

    private final RateSchedValdMapper rateSchedValdMapper;

    public RateSchedValdServiceImpl(RateSchedValdRepository rateSchedValdRepository, RateSchedValdMapper rateSchedValdMapper) {
        this.rateSchedValdRepository = rateSchedValdRepository;
        this.rateSchedValdMapper = rateSchedValdMapper;
    }

    /**
     * Save a rateSchedVald.
     *
     * @param rateSchedValdDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RateSchedValdDTO save(RateSchedValdDTO rateSchedValdDTO) {
        log.debug("Request to save RateSchedVald : {}", rateSchedValdDTO);
        RateSchedVald rateSchedVald = rateSchedValdMapper.toEntity(rateSchedValdDTO);
        rateSchedVald = rateSchedValdRepository.save(rateSchedVald);
        return rateSchedValdMapper.toDto(rateSchedVald);
    }

    /**
     * Get all the rateSchedValds.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RateSchedValdDTO> findAll() {
        log.debug("Request to get all RateSchedValds");
        return rateSchedValdRepository.findAll().stream()
            .map(rateSchedValdMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one rateSchedVald by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RateSchedValdDTO> findOne(Long id) {
        log.debug("Request to get RateSchedVald : {}", id);
        return rateSchedValdRepository.findById(id)
            .map(rateSchedValdMapper::toDto);
    }

    /**
     * Delete the rateSchedVald by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RateSchedVald : {}", id);        rateSchedValdRepository.deleteById(id);
    }
}
