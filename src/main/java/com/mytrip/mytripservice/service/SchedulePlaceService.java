package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.dto.SchedulePlaceDTO;
import com.mytrip.mytripservice.entity.DailySchedule;
import com.mytrip.mytripservice.entity.Place;
import com.mytrip.mytripservice.entity.SchedulePlace;
import com.mytrip.mytripservice.repository.DailyScheduleRepository;
import com.mytrip.mytripservice.repository.PlaceRepository;
import com.mytrip.mytripservice.repository.SchedulePlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SchedulePlaceService {
    private final SchedulePlaceRepository schedulePlaceRepository;
    private final DailyScheduleRepository dailyScheduleRepository;
    private final PlaceRepository placeRepository;

    @Autowired
    public SchedulePlaceService(SchedulePlaceRepository schedulePlaceRepository, DailyScheduleRepository dailyScheduleRepository, PlaceRepository placeRepository) {
        this.schedulePlaceRepository = schedulePlaceRepository;
        this.dailyScheduleRepository = dailyScheduleRepository;
        this.placeRepository = placeRepository;
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
            schedulePlace.setDailySchedule(dailyScheduleRepository.findById(schedulePlaceDetails.getScheduleId())
                    .orElseThrow(() -> new RuntimeException("DailySchedule not found")));
            schedulePlace.setPlace(placeRepository.findById(schedulePlaceDetails.getPlaceId())
                    .orElseThrow(() -> new RuntimeException("Place not found")));
            schedulePlace.setDuration(schedulePlaceDetails.getDuration());
            schedulePlace.setStartTime(schedulePlaceDetails.getStartTime() != null ? LocalTime.parse(schedulePlaceDetails.getStartTime()) : null);
            schedulePlace.setEndTime(schedulePlaceDetails.getEndTime() != null ? LocalTime.parse(schedulePlaceDetails.getEndTime()) : null);
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
        schedulePlaceDTO.setDuration(schedulePlace.getDuration());
        schedulePlaceDTO.setStartTime(schedulePlace.getStartTime() != null ? schedulePlace.getStartTime().toString() : null);
        schedulePlaceDTO.setEndTime(schedulePlace.getEndTime() != null ? schedulePlace.getEndTime().toString() : null);
        return schedulePlaceDTO;
    }

    private SchedulePlace toEntity(SchedulePlaceDTO schedulePlaceDTO) {
        SchedulePlace schedulePlace = new SchedulePlace();
        schedulePlace.setDailySchedule(dailyScheduleRepository.findById(schedulePlaceDTO.getScheduleId())
                .orElseThrow(() -> new RuntimeException("DailySchedule not found")));
        schedulePlace.setPlace(placeRepository.findById(schedulePlaceDTO.getPlaceId())
                .orElseThrow(() -> new RuntimeException("Place not found")));
        schedulePlace.setDuration(schedulePlaceDTO.getDuration());
        schedulePlace.setStartTime(schedulePlaceDTO.getStartTime() != null ? LocalTime.parse(schedulePlaceDTO.getStartTime()) : null);
        schedulePlace.setEndTime(schedulePlaceDTO.getEndTime() != null ? LocalTime.parse(schedulePlaceDTO.getEndTime()) : null);
        return schedulePlace;
    }
}
