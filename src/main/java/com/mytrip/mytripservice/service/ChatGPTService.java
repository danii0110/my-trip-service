package com.mytrip.mytripservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.mytrip.mytripservice.dto.DailyScheduleOtherDTO;
import com.mytrip.mytripservice.dto.OptimizedScheduleDTO;
import com.mytrip.mytripservice.model.ChatGPTRequest;
import com.mytrip.mytripservice.model.ChatGPTResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.time.LocalTime;
import java.util.List;

@Service
public class ChatGPTService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Autowired
    public ChatGPTService(WebClient webClient) {
        this.webClient = webClient;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    public Mono<String> callChatGPTAPI(List<DailyScheduleOtherDTO> dailySchedules) throws JsonProcessingException {
        String schedulesJson = objectMapper.writeValueAsString(dailySchedules);

        String prompt = "Here are the schedule data for a trip. " +
                "Please calculate an efficient route and set the start and end times for each place. " +
                "Return the updated data with 'startTime' and 'endTime' fields added." +
                "Don't make it in java format, but JSON format" +
                schedulesJson +
                "Respond the update data with following JSON format. Ensure that format is DTO of schedulePlaces and name is place.name" +
                """
                        Response format:
                                        [
                                          {
                                            "schedulePlaceId": "",
                                            "name": "",
                                            "startTime": "",
                                            "endTime": ""
                                          }
                                        ]
                        Data:
                """;

        System.out.println(prompt);
        ChatGPTRequest chatGPTRequest = new ChatGPTRequest("gpt-3.5-turbo",
                List.of(new ChatGPTRequest.Message("user", prompt)));

        return webClient.post()
                .body(Mono.just(chatGPTRequest), ChatGPTRequest.class)
                .retrieve()
                .bodyToMono(ChatGPTResponse.class)
                .flatMap(this::extractResponseContent)
                .onErrorResume(e -> Mono.just("Error: " + e.getMessage()));
    }

    public Mono<String> callChatGPTAPIForString(List<DailyScheduleOtherDTO> dailySchedules) throws JsonProcessingException {
        String schedulesJson = objectMapper.writeValueAsString(dailySchedules);

        String prompt = """
            Here are the schedule data for a trip. Please evaluate the efficiency of the travel schedule for each day based on the following conditions:
            1. Ensure that a restaurant is included in the schedule.
            2. Verify that travel time between locations is not excessive (travel time should not exceed 40% of the total schedule time for the day).
            3. If there is a place categorized as "accommodation", assess whether the accommodation is not too far from other places.
            4. Ensure a balanced distribution of activities throughout the day, avoiding long periods of inactivity.
            5. Verify that the schedule includes at least one major attraction per day.
            6. Ensure that the overall daily schedule does not exceed a reasonable number of hours (e.g., 8-10 hours of activities).
    
            """ +
                schedulesJson +
                "Return the evaluation in the following format: 'Day 1: [evaluation]', 'Day 2: [evaluation]', etc. Respond in Korean.";

        System.out.println(prompt);
        ChatGPTRequest chatGPTRequest = new ChatGPTRequest("gpt-3.5-turbo",
                List.of(new ChatGPTRequest.Message("user", prompt)));

        return webClient.post()
                .body(Mono.just(chatGPTRequest), ChatGPTRequest.class)
                .retrieve()
                .bodyToMono(ChatGPTResponse.class)
                .map(response -> {
                    String content = response.getChoices().get(0).getMessage().getContent();
                    return content;
                })
                .onErrorResume(e -> Mono.just("Error: " + e.getMessage()));

//        return webClient.post()
//                .body(Mono.just(chatGPTRequest), ChatGPTRequest.class)
//                .retrieve()
//                .bodyToMono(String.class)
//                .onErrorResume(e -> Mono.just("Error: " + e.getMessage()));
    }

    private Mono<String> extractResponseContent(ChatGPTResponse response) {
        try {
            String content = response.getChoices().get(0).getMessage().getContent();
            return Mono.just(content);
        } catch (Exception e) {
            System.out.println("Failed to parse optimized schedules JSON: " + e.getMessage());
            return Mono.error(new RuntimeException("Failed to parse optimized schedules JSON", e));
        }
    }

    public List<OptimizedScheduleDTO> parseResponse(String responseContent) {
        try {
            return objectMapper.readValue(responseContent, new TypeReference<List<OptimizedScheduleDTO>>() {
            });
        } catch (Exception e) {
            throw new RuntimeException("Error parsing response: " + e.getMessage(), e);
        }
    }

    public List<DailyScheduleOtherDTO> updateDailySchedules(List<DailyScheduleOtherDTO> dailySchedules, List<OptimizedScheduleDTO> optimizedSchedules) {
        for (DailyScheduleOtherDTO dailySchedule : dailySchedules) {
            for (var schedulePlace : dailySchedule.getSchedulePlaces()) {
                for (var optimizedSchedule : optimizedSchedules) {
                    System.out.println("schedule: " + schedulePlace.getSchedulePlaceId());
                    System.out.println("optimize" + optimizedSchedule.getSchedulePlaceId());
                    if (String.valueOf(schedulePlace.getSchedulePlaceId()).equals(optimizedSchedule.getSchedulePlaceId())) {
                        schedulePlace.setStartTime(LocalTime.parse(optimizedSchedule.getStartTime()));
                        schedulePlace.setEndTime(LocalTime.parse(optimizedSchedule.getEndTime()));
                        System.out.println("did");
                    }
                }
            }
        }
        return dailySchedules;
    }
}