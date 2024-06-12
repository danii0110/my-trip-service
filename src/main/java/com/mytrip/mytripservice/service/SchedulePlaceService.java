package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.entity.SchedulePlace;
import com.mytrip.mytripservice.repository.SchedulePlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SchedulePlaceService {
    private final SchedulePlaceRepository schedulePlaceRepository;

    @Autowired
    public SchedulePlaceService(SchedulePlaceRepository schedulePlaceRepository) {
        this.schedulePlaceRepository = schedulePlaceRepository;
    }

    public List<SchedulePlace> getAllSchedulePlaces() {
        return schedulePlaceRepository.findAll();
    }

    public Optional<SchedulePlace> getSchedulePlaceById(Long id) {
        return schedulePlaceRepository.findById(id);
    }

    public SchedulePlace createSchedulePlace(SchedulePlace schedulePlace) {
        return schedulePlaceRepository.save(schedulePlace);
    }

    public SchedulePlace updateSchedulePlace(Long id, SchedulePlace schedulePlaceDetails) {
        return schedulePlaceRepository.findById(id).map(schedulePlace -> {
            schedulePlace.setDailySchedule(schedulePlaceDetails.getDailySchedule());
            schedulePlace.setPlace(schedulePlaceDetails.getPlace());
            return schedulePlaceRepository.save(schedulePlace);
        }).orElseThrow(() -> new RuntimeException("SchedulePlace not found"));
    }

    public void deleteSchedulePlace(Long id) {
        schedulePlaceRepository.deleteById(id);
    }
}
