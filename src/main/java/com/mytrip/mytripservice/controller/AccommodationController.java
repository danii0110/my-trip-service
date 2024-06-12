package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.dto.AccommodationRequest;
import com.mytrip.mytripservice.entity.Accommodation;
import com.mytrip.mytripservice.service.AccommodationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accommodations")
public class AccommodationController {

    private final AccommodationService accommodationService;

    @Autowired
    public AccommodationController(AccommodationService accommodationService) {
        this.accommodationService = accommodationService;
    }

    @PostMapping
    public ResponseEntity<Accommodation> createAccommodation(@RequestBody AccommodationRequest request) {
        // 로깅 추가
        System.out.println("Received accommodation request: " + request);
        System.out.println("Coordinates: " + request.getXCoordinate() + ", " + request.getYCoordinate());

        Accommodation createdAccommodation = accommodationService.createAccommodation(request);
        return ResponseEntity.ok(createdAccommodation);
    }

    @GetMapping
    public ResponseEntity<List<Accommodation>> getAllAccommodations() {
        List<Accommodation> accommodations = accommodationService.getAllAccommodations();
        return ResponseEntity.ok(accommodations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accommodation> getAccommodationById(@PathVariable Long id) {
        Optional<Accommodation> accommodation = accommodationService.getAccommodationById(id);
        return accommodation.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Accommodation> updateAccommodation(@PathVariable Long id, @RequestBody AccommodationRequest request) {
        Accommodation updatedAccommodation = accommodationService.updateAccommodation(id, request);
        return ResponseEntity.ok(updatedAccommodation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccommodation(@PathVariable Long id) {
        accommodationService.deleteAccommodation(id);
        return ResponseEntity.noContent().build();
    }
}
