// SchedulePlaceService.java
package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.dto.SchedulePlaceDTO;
import com.mytrip.mytripservice.entity.DailySchedule;
import com.mytrip.mytripservice.entity.Place;
import com.mytrip.mytripservice.entity.SchedulePlace;
import com.mytrip.mytripservice.repository.SchedulePlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SchedulePlaceService {
    private final SchedulePlaceRepository schedulePlaceRepository;

    @Autowired
    public SchedulePlaceService(SchedulePlaceRepository schedulePlaceRepository) {
        this.schedulePlaceRepository = schedulePlaceRepository;
    }

    public List<SchedulePlaceDTO> getAllSchedulePlaces() {
        return schedulePlaceRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<SchedulePlaceDTO> getSchedulePlaceById(Long id) {
        return schedulePlaceRepository.findById(id).map(this::toDTO);
    }

    @Transactional
    public SchedulePlaceDTO createSchedulePlace(SchedulePlaceDTO schedulePlaceDTO) {
        SchedulePlace schedulePlace = toEntity(schedulePlaceDTO);
        return toDTO(schedulePlaceRepository.save(schedulePlace));
    }

    @Transactional
    public SchedulePlaceDTO updateSchedulePlace(Long id, SchedulePlaceDTO schedulePlaceDetails) {
        return schedulePlaceRepository.findById(id).map(schedulePlace -> {
            schedulePlace.setDailySchedule(new DailySchedule(schedulePlaceDetails.getScheduleId()));
            schedulePlace.setPlace(new Place(schedulePlaceDetails.getPlaceId()));
            return toDTO(schedulePlaceRepository.save(schedulePlace));
        }).orElseThrow(() -> new RuntimeException("SchedulePlace not found"));
    }

    @Transactional
    public void deleteSchedulePlace(Long id) {
        schedulePlaceRepository.deleteById(id);
    }

    private SchedulePlaceDTO toDTO(SchedulePlace schedulePlace) {
        SchedulePlaceDTO schedulePlaceDTO = new SchedulePlaceDTO();
        schedulePlaceDTO.setSchedulePlaceId(schedulePlace.getSchedulePlaceId());
        schedulePlaceDTO.setScheduleId(schedulePlace.getDailySchedule().getScheduleId());
        schedulePlaceDTO.setPlaceId(schedulePlace.getPlace().getPlaceId());
        return schedulePlaceDTO;
    }

    private SchedulePlace toEntity(SchedulePlaceDTO schedulePlaceDTO) {
        SchedulePlace schedulePlace = new SchedulePlace();
        schedulePlace.setSchedulePlaceId(schedulePlaceDTO.getSchedulePlaceId());
        schedulePlace.setDailySchedule(new DailySchedule(schedulePlaceDTO.getScheduleId()));
        schedulePlace.setPlace(new Place(schedulePlaceDTO.getPlaceId()));
        return schedulePlace;
    }
}
