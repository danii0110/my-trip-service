package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.entity.SchedulePlaces;
import com.mytrip.mytripservice.service.SchedulePlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    public ResponseEntity<SchedulePlaces> createSchedulePlace(@RequestBody SchedulePlaces schedulePlaces) {
        SchedulePlaces createdSchedulePlace = schedulePlacesService.createSchedulePlace(schedulePlaces);
        return ResponseEntity.ok(createdSchedulePlace);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SchedulePlaces> getSchedulePlaceById(@PathVariable Long id) {
        Optional<SchedulePlaces> schedulePlaces = schedulePlacesService.getSchedulePlaceById(id);
        return schedulePlaces.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SchedulePlaces> updateSchedulePlace(@PathVariable Long id, @RequestBody SchedulePlaces schedulePlaces) {
        SchedulePlaces updatedSchedulePlace = schedulePlacesService.updateSchedulePlace(id, schedulePlaces);
        return ResponseEntity.ok(updatedSchedulePlace);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedulePlace(@PathVariable Long id) {
        schedulePlacesService.deleteSchedulePlace(id);
        return ResponseEntity.noContent().build();
    }
}
