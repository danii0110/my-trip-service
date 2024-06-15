// PlaceService.java
package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.dto.PlaceDTO;
import com.mytrip.mytripservice.entity.Place;
import com.mytrip.mytripservice.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlaceService {
    private final PlaceRepository placeRepository;

    @Autowired
    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    public List<PlaceDTO> getAllPlaces() {
        return placeRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<PlaceDTO> getPlaceById(Long id) {
        return placeRepository.findById(id).map(this::toDTO);
    }

    @Transactional
    public PlaceDTO createPlace(PlaceDTO placeDTO) {
        Place place = toEntity(placeDTO);
        return toDTO(placeRepository.save(place));
    }

    @Transactional
    public PlaceDTO updatePlace(Long id, PlaceDTO placeDetails) {
        return placeRepository.findById(id).map(place -> {
            place.setName(placeDetails.getName());
            place.setAddress(placeDetails.getAddress());
            place.setCategory(placeDetails.getCategory());
            place.setImage(placeDetails.getImage());
            place.setXCoordinate(placeDetails.getXCoordinate());
            place.setYCoordinate(placeDetails.getYCoordinate());
            return toDTO(placeRepository.save(place));
        }).orElseThrow(() -> new RuntimeException("Place not found"));
    }

    @Transactional
    public void deletePlace(Long id) {
        placeRepository.deleteById(id);
    }

    private PlaceDTO toDTO(Place place) {
        PlaceDTO placeDTO = new PlaceDTO();
        placeDTO.setPlaceId(place.getPlaceId());
        placeDTO.setName(place.getName());
        placeDTO.setAddress(place.getAddress());
        placeDTO.setCategory(place.getCategory());
        placeDTO.setImage(place.getImage());
        placeDTO.setXCoordinate(place.getXCoordinate());
        placeDTO.setYCoordinate(place.getYCoordinate());
        return placeDTO;
    }

    private Place toEntity(PlaceDTO placeDTO) {
        Place place = new Place();
        place.setPlaceId(placeDTO.getPlaceId());
        place.setName(placeDTO.getName());
        place.setAddress(placeDTO.getAddress());
        place.setCategory(placeDTO.getCategory());
        place.setImage(placeDTO.getImage());
        place.setXCoordinate(placeDTO.getXCoordinate());
        place.setYCoordinate(placeDTO.getYCoordinate());
        return place;
    }
}
