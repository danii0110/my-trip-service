package com.mytrip.mytripservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.mytrip.mytripservice.dto.DailyScheduleOtherDTO;
import com.mytrip.mytripservice.dto.OptimizedScheduleDTO;
import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.model.ChatGPTRequest;
import com.mytrip.mytripservice.model.ChatGPTResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

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

    public Mono<String> callChatGPTAPI(List<DailyScheduleOtherDTO> dailySchedules, Optional<Plan> plan) throws JsonProcessingException {
        String schedulesJson = objectMapper.writeValueAsString(dailySchedules);
        String planJson = objectMapper.writeValueAsString(plan);

        String prompt = "Here are the schedule data for a trip. " +
                "Please calculate an efficient route and set the start and end times for each place considering the following conditions: " +
                "1. Use the xCoordinate and yCoordinate of each place to calculate travel time between locations and determine the optimal order of visits. " +
                "2. The startTime and endTime for each place should reflect its duration. " +
                "3. When calculating travel times between locations, if the transportation method is 'CAR', consider car travel times; otherwise, consider public transportation travel times. " +
                "4. The travel time between places should consider the distance and the transportation method. " +
                "5. Return the updated data with 'startTime' and 'endTime' fields added. " +
                planJson + "\n" + schedulesJson +
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
            1. Verify that travel time between locations is not excessive (travel time should not exceed 40% of the total schedule time for the day).
            2. If there is a place categorized as accommodation(a place with category "ACCOMMODATION"), assess whether the accommodation is not too far from other places.
            3. Ensure a balanced distribution of activities throughout the day, avoiding long periods of inactivity.
            4. Ensure that the overall daily schedule does not exceed a reasonable number of hours (e.g., 8-12 hours of activities). The total time includes the sum of the duration of all places and the sum of travel times between places.
            
            """ +
                schedulesJson +
                "For each day, provide all days of the overall assessment in the following format: '1일차: [evaluation]', '2일차: [evaluation]', etc." +
                "Respond in Korean and provide at least two detailed sentences for each evaluation. Also, specify any conditions that are not met.";

        System.out.println(prompt);
        ChatGPTRequest chatGPTRequest = new ChatGPTRequest("gpt-3.5-turbo",
                List.of(new ChatGPTRequest.Message("user", prompt)));

        return webClient.post()
                .body(Mono.just(chatGPTRequest), ChatGPTRequest.class)
                .retrieve()
                .bodyToMono(ChatGPTResponse.class)
                .map(response -> response.getChoices().get(0).getMessage().getContent())
                .onErrorResume(e -> Mono.just("Error: " + e.getMessage()));
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