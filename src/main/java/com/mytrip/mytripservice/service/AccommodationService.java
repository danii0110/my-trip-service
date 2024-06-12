package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.dto.AccommodationRequest;
import com.mytrip.mytripservice.entity.Accommodation;
import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.repository.AccommodationRepository;
import com.mytrip.mytripservice.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AccommodationService {

    private final AccommodationRepository accommodationRepository;
    private final PlanRepository planRepository;

    @Autowired
    public AccommodationService(AccommodationRepository accommodationRepository, PlanRepository planRepository) {
        this.accommodationRepository = accommodationRepository;
        this.planRepository = planRepository;
    }

    public Accommodation createAccommodation(AccommodationRequest request) {
        Plan plan = planRepository.findById(request.getPlanId())
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        Accommodation accommodation = Accommodation.builder()
                .plan(plan)
                .name(request.getName())
                .address(request.getAddress())
                .category(request.getCategory())
                .image(request.getImage())
                .xCoordinate(request.getXCoordinate())
                .yCoordinate(request.getYCoordinate())
                .startDate(LocalDate.parse(request.getStartDate()))
                .endDate(LocalDate.parse(request.getEndDate()))
                .build();

        return accommodationRepository.save(accommodation);
    }

    public List<Accommodation> getAllAccommodations() {
        return accommodationRepository.findAll();
    }

    public Optional<Accommodation> getAccommodationById(Long id) {
        return accommodationRepository.findById(id);
    }

    public Accommodation updateAccommodation(Long id, AccommodationRequest request) {
        return accommodationRepository.findById(id).map(accommodation -> {
            Plan plan = planRepository.findById(request.getPlanId())
                    .orElseThrow(() -> new RuntimeException("Plan not found"));

            accommodation.setPlan(plan);
            accommodation.setName(request.getName());
            accommodation.setAddress(request.getAddress());
            accommodation.setCategory(request.getCategory());
            accommodation.setImage(request.getImage());
            accommodation.setXCoordinate(request.getXCoordinate());
            accommodation.setYCoordinate(request.getYCoordinate());
            accommodation.setStartDate(LocalDate.parse(request.getStartDate()));
            accommodation.setEndDate(LocalDate.parse(request.getEndDate()));
            return accommodationRepository.save(accommodation);
        }).orElseThrow(() -> new RuntimeException("Accommodation not found"));
    }

    public void deleteAccommodation(Long id) {
        accommodationRepository.deleteById(id);
    }
}
