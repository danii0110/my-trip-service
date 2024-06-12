package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.entity.Accommodation;
import com.mytrip.mytripservice.repository.AccommodationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccommodationService {
    private final AccommodationRepository accommodationRepository;

    @Autowired
    public AccommodationService(AccommodationRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
    }

    public List<Accommodation> getAllAccommodations() {
        return accommodationRepository.findAll();
    }

    public Optional<Accommodation> getAccommodationById(Long id) {
        return accommodationRepository.findById(id);
    }

    public Accommodation createAccommodation(Accommodation accommodation) {
        return accommodationRepository.save(accommodation);
    }

    public Accommodation updateAccommodation(Long id, Accommodation accommodationDetails) {
        return accommodationRepository.findById(id).map(accommodation -> {
            accommodation.setName(accommodationDetails.getName());
            accommodation.setAddress(accommodationDetails.getAddress());
            accommodation.setCategory(accommodationDetails.getCategory());
            accommodation.setImage(accommodationDetails.getImage());
            accommodation.setXCoordinate(accommodationDetails.getXCoordinate());
            accommodation.setYCoordinate(accommodationDetails.getYCoordinate());
            accommodation.setStartDate(accommodationDetails.getStartDate());
            accommodation.setEndDate(accommodationDetails.getEndDate());
            return accommodationRepository.save(accommodation);
        }).orElseThrow(() -> new RuntimeException("Accommodation not found"));
    }

    public void deleteAccommodation(Long id) {
        accommodationRepository.deleteById(id);
    }
}
