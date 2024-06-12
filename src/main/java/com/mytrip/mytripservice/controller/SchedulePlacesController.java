package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.entity.SchedulePlace;
import com.mytrip.mytripservice.service.SchedulePlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/schedule-places")
public class SchedulePlacesController {

    private final SchedulePlacesService schedulePlacesService;

    @Autowired
    public SchedulePlacesController(SchedulePlacesService schedulePlacesService) {
        this.schedulePlacesService = schedulePlacesService;
    }

    @PostMapping
    public ResponseEntity<SchedulePlace> createSchedulePlace(@RequestBody SchedulePlace schedulePlace) {
        SchedulePlace createdSchedulePlace = schedulePlacesService.createSchedulePlace(schedulePlace);
        return ResponseEntity.ok(createdSchedulePlace);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SchedulePlace> getSchedulePlaceById(@PathVariable Long id) {
        Optional<SchedulePlace> schedulePlaces = schedulePlacesService.getSchedulePlaceById(id);
        return schedulePlaces.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SchedulePlace> updateSchedulePlace(@PathVariable Long id, @RequestBody SchedulePlace schedulePlace) {
        SchedulePlace updatedSchedulePlace = schedulePlacesService.updateSchedulePlace(id, schedulePlace);
        return ResponseEntity.ok(updatedSchedulePlace);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedulePlace(@PathVariable Long id) {
        schedulePlacesService.deleteSchedulePlace(id);
        return ResponseEntity.noContent().build();
    }
}
