package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.dto.SchedulePlaceDTO;
import com.mytrip.mytripservice.service.SchedulePlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/schedule-places")
public class SchedulePlaceController {

    private final SchedulePlaceService schedulePlaceService;

    @Autowired
    public SchedulePlaceController(SchedulePlaceService schedulePlaceService) {
        this.schedulePlaceService = schedulePlaceService;
    }

    @GetMapping
    public ResponseEntity<List<SchedulePlaceDTO>> getAllSchedulePlaces() {
        List<SchedulePlaceDTO> schedulePlaces = schedulePlaceService.getAllSchedulePlaces();
        return ResponseEntity.ok(schedulePlaces);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SchedulePlaceDTO> getSchedulePlaceById(@PathVariable Long id) {
        Optional<SchedulePlaceDTO> schedulePlace = schedulePlaceService.getSchedulePlaceById(id);
        return schedulePlace.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SchedulePlaceDTO> createSchedulePlace(@RequestBody SchedulePlaceDTO schedulePlaceDTO) {
        SchedulePlaceDTO createdSchedulePlace = schedulePlaceService.createSchedulePlace(schedulePlaceDTO);
        return ResponseEntity.ok(createdSchedulePlace);
    }

    @PatchMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SchedulePlaceDTO> updateSchedulePlace(@PathVariable Long id, @RequestBody SchedulePlaceDTO schedulePlaceDetails) {
        SchedulePlaceDTO updatedSchedulePlace = schedulePlaceService.updateSchedulePlace(id, schedulePlaceDetails);
        return ResponseEntity.ok(updatedSchedulePlace);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedulePlace(@PathVariable Long id) {
        schedulePlaceService.deleteSchedulePlace(id);
        return ResponseEntity.noContent().build();
    }
}
