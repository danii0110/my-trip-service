//package com.mytrip.mytripservice.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.mytrip.mytripservice.entity.Place;
//import com.mytrip.mytripservice.entity.PlaceType;
//import com.mytrip.mytripservice.repository.PlaceRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.hamcrest.Matchers.*;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//public class PlaceControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Autowired
//    private PlaceRepository placeRepository;
//
//    private Place place;
//
//    @BeforeEach
//    void setUp() {
//        placeRepository.deleteAll(); // 테스트 전 데이터 초기화
//        place = Place.builder()
//                .name("Namsan Tower")
//                .address("Seoul, Yongsan-gu, South Korea")
//                .category("Tourist Attraction")
//                .image("https://example.com/image.jpg")
//                .xCoordinate(37.551169)
//                .yCoordinate(126.988227)
//                .placeType(PlaceType.LOCATION)
//                .build();
//        placeRepository.save(place);
//    }
//
//    @Test
//    void shouldGetPlaceById() throws Exception {
//        mockMvc.perform(get("/api/places/" + place.getPlaceId())
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(content().json(objectMapper.writeValueAsString(place)));
//    }
//
//    @Test
//    void shouldCreatePlace() throws Exception {
//        Place newPlace = Place.builder()
//                .name("Bukchon Hanok Village")
//                .address("Seoul, Jongno-gu, South Korea")
//                .category("Cultural Heritage")
//                .image("https://example.com/bukchon.jpg")
//                .xCoordinate(37.582604)
//                .yCoordinate(126.983578)
//                .placeType(PlaceType.LOCATION)
//                .build();
//
//        mockMvc.perform(post("/api/places")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(newPlace)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.name").value(newPlace.getName()))
//                .andExpect(jsonPath("$.address").value(newPlace.getAddress()))
//                .andExpect(jsonPath("$.category").value(newPlace.getCategory()))
//                .andExpect(jsonPath("$.image").value(newPlace.getImage()))
//                .andExpect(jsonPath("$.xCoordinate").value(newPlace.getXCoordinate()))
//                .andExpect(jsonPath("$.yCoordinate").value(newPlace.getYCoordinate()))
//                .andExpect(jsonPath("$.placeType").value(newPlace.getPlaceType().toString()));
//    }
//}
