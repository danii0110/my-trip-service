package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.entity.SchedulePlace;
import com.mytrip.mytripservice.entity.Place;
import com.mytrip.mytripservice.service.SchedulePlaceService;
import com.mytrip.mytripservice.service.PlaceService;
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
    private final PlaceService placeService;

    @Autowired
    public SchedulePlaceController(SchedulePlaceService schedulePlaceService, PlaceService placeService) {
        this.schedulePlaceService = schedulePlaceService;
        this.placeService = placeService;
    }

    @GetMapping
    public ResponseEntity<List<SchedulePlace>> getAllSchedulePlaces() {
        List<SchedulePlace> schedulePlaces = schedulePlaceService.getAllSchedulePlaces();
        return ResponseEntity.ok(schedulePlaces);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SchedulePlace> getSchedulePlaceById(@PathVariable Long id) {
        Optional<SchedulePlace> schedulePlace = schedulePlaceService.getSchedulePlaceById(id);
        return schedulePlace.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SchedulePlace> createSchedulePlace(@RequestBody SchedulePlace schedulePlace) {
        SchedulePlace createdSchedulePlace = schedulePlaceService.createSchedulePlace(schedulePlace);

        // Fetch complete place details
        Place place = placeService.getPlaceById(createdSchedulePlace.getPlace().getPlaceId()).orElse(null);
        createdSchedulePlace.setPlace(place);

        return ResponseEntity.ok(createdSchedulePlace);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SchedulePlace> updateSchedulePlace(@PathVariable Long id, @RequestBody SchedulePlace schedulePlaceDetails) {
        SchedulePlace updatedSchedulePlace = schedulePlaceService.updateSchedulePlace(id, schedulePlaceDetails);
        return ResponseEntity.ok(updatedSchedulePlace);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedulePlace(@PathVariable Long id) {
        schedulePlaceService.deleteSchedulePlace(id);
        return ResponseEntity.noContent().build();
    }
}
