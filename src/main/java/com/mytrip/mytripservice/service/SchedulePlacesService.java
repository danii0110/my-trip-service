package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.entity.SchedulePlaces;
import com.mytrip.mytripservice.repository.SchedulePlacesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SchedulePlacesService {

    private final SchedulePlacesRepository schedulePlacesRepository;

    @Autowired
    public SchedulePlacesService(SchedulePlacesRepository schedulePlacesRepository) {
        this.schedulePlacesRepository = schedulePlacesRepository;
    }

    public SchedulePlaces createSchedulePlace(SchedulePlaces schedulePlaces) {
        return schedulePlacesRepository.save(schedulePlaces);
    }

    public Optional<SchedulePlaces> getSchedulePlaceById(Long id) {
        return schedulePlacesRepository.findById(id);
    }

    public SchedulePlaces updateSchedulePlace(Long id, SchedulePlaces schedulePlacesDetails) {
        return schedulePlacesRepository.findById(id)
                .map(schedulePlaces -> {
                    schedulePlaces.setDailySchedule(schedulePlacesDetails.getDailySchedule());
                    schedulePlaces.setPlace(schedulePlacesDetails.getPlace());
                    return schedulePlacesRepository.save(schedulePlaces);
                }).orElseThrow(() -> new RuntimeException("SchedulePlace not found"));
    }

    public void deleteSchedulePlace(Long id) {
        schedulePlacesRepository.deleteById(id);
    }
}
