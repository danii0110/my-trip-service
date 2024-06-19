//package com.mytrip.mytripservice.service;
//
//import com.mytrip.mytripservice.entity.Place;
//import com.mytrip.mytripservice.entity.PlaceType;
//import com.mytrip.mytripservice.repository.PlaceRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//
//class PlaceServiceTest {
//
//    @Mock
//    private PlaceRepository placeRepository;
//
//    @InjectMocks
//    private PlaceService placeService;
//
//    private Place place;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//        place = Place.builder()
//                .name("Namsan Tower")
//                .address("Seoul, Yongsan-gu, South Korea")
//                .category("Tourist Attraction")
//                .image("https://example.com/image.jpg")
//                .xCoordinate(37.551169)
//                .yCoordinate(126.988227)
//                .placeType(PlaceType.LOCATION)
//                .build();
//    }
//
//    @Test
//    void testCreatePlace() {
//        when(placeRepository.save(any(Place.class))).thenReturn(place);
//
//        Place createdPlace = placeService.createPlace(place);
//
//        assertNotNull(createdPlace);
//        assertEquals(place.getName(), createdPlace.getName());
//        verify(placeRepository, times(1)).save(any(Place.class));
//    }
//
//    @Test
//    void testGetPlaceById() {
//        when(placeRepository.findById(anyLong())).thenReturn(Optional.of(place));
//
//        Optional<Place> foundPlace = placeService.getPlaceById(1L);
//
//        assertTrue(foundPlace.isPresent());
//        assertEquals(place.getName(), foundPlace.get().getName());
//        verify(placeRepository, times(1)).findById(anyLong());
//    }
//
//    @Test
//    void testGetAllPlaces() {
//        List<Place> places = Arrays.asList(place);
//        when(placeRepository.findAll()).thenReturn(places);
//
//        List<Place> foundPlaces = placeService.getAllPlaces();
//
//        assertEquals(1, foundPlaces.size());
//        verify(placeRepository, times(1)).findAll();
//    }
//
//    @Test
//    void testUpdatePlace() {
//        Place updatedDetails = Place.builder()
//                .name("Bukchon Hanok Village")
//                .address("Seoul, Jongno-gu, South Korea")
//                .category("Cultural Heritage")
//                .image("https://example.com/bukchon.jpg")
//                .xCoordinate(37.582604)
//                .yCoordinate(126.983578)
//                .placeType(PlaceType.LOCATION)
//                .build();
//
//        when(placeRepository.findById(anyLong())).thenReturn(Optional.of(place));
//        when(placeRepository.save(any(Place.class))).thenReturn(updatedDetails);
//
//        Place updatedPlace = placeService.updatePlace(1L, updatedDetails);
//
//        assertNotNull(updatedPlace);
//        assertEquals(updatedDetails.getName(), updatedPlace.getName());
//        verify(placeRepository, times(1)).findById(anyLong());
//        verify(placeRepository, times(1)).save(any(Place.class));
//    }
//
//    @Test
//    void testDeletePlace() {
//        doNothing().when(placeRepository).deleteById(anyLong());
//
//        placeService.deletePlace(1L);
//
//        verify(placeRepository, times(1)).deleteById(anyLong());
//    }
//}
