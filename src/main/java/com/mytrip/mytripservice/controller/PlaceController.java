package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.entity.Place;
import com.mytrip.mytripservice.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/places")
public class PlaceController {
    private final PlaceService placeService;

    @Autowired
    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @PostMapping
    public ResponseEntity<Place> createPlace(@RequestBody Place place) {
        System.out.println("Received place: " + place.toString());
        Place createdPlace = placeService.createPlace(place);
        System.out.println("Creating place: " + createdPlace.toString());
        return ResponseEntity.ok(createdPlace);
    }

    @GetMapping
    public ResponseEntity<List<Place>> getAllPlaces() {
        List<Place> places = placeService.getAllPlaces();
        return ResponseEntity.ok(places);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Place> getPlaceById(@PathVariable Long id) {
        Optional<Place> place = placeService.getPlaceById(id);
        return place.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Place> updatePlace(@PathVariable Long id, @RequestBody Place placeDetails) {
        Place updatedPlace = placeService.updatePlace(id, placeDetails);
        return ResponseEntity.ok(updatedPlace);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlace(@PathVariable Long id) {
        placeService.deletePlace(id);
        return ResponseEntity.noContent().build();
    }
}
