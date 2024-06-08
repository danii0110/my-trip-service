package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.entity.Place;
import com.mytrip.mytripservice.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaceService {
    private final PlaceRepository placeRepository;

    @Autowired
    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    public Place createPlace(Place place) {
        System.out.println("Creating place: " + place);
        return placeRepository.save(place);
    }

    public Optional<Place> getPlaceById(Long id) {
        return placeRepository.findById(id);
    }

    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    public Place updatePlace(Long id, Place placeDetails) {
        return placeRepository.findById(id).map(place -> {
            place.setName(placeDetails.getName());
            place.setAddress(placeDetails.getAddress());
            place.setCategory(placeDetails.getCategory());
            place.setImage(placeDetails.getImage());
            place.setXCoordinate(placeDetails.getXCoordinate());
            place.setYCoordinate(placeDetails.getYCoordinate());
            place.setPlaceType(placeDetails.getPlaceType());
            return placeRepository.save(place);
        }).orElseThrow(() -> new RuntimeException("Place not found"));
    }

    public void deletePlace(Long id) {
        placeRepository.deleteById(id);
    }
}


