package com.mytrip.mytripservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mytrip.mytripservice.dto.DailyScheduleOtherDTO;
import com.mytrip.mytripservice.dto.OptimizedScheduleDTO;
import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.service.ChatGPTService;
import com.mytrip.mytripservice.service.DailyScheduleService;
import com.mytrip.mytripservice.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chatgpt")
public class ChatGPTController {

    @Autowired
    private ChatGPTService chatGPTService;
    private PlanService planService;
    private DailyScheduleService dailyScheduleService;

    @Autowired
    private WebClient webClient;

    public ChatGPTController(PlanService planService, DailyScheduleService dailyScheduleService) {
        this.planService = planService;
        this.dailyScheduleService = dailyScheduleService;
    }

    @GetMapping("/plan/{id}")
    public ResponseEntity<Plan> getPlanByPlanId(@PathVariable Long id) {
        Optional<Plan> plan = planService.getPlanByPlanId(id);
        return plan.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/daily-schedules/plan/{planId}")
    public ResponseEntity<List<DailyScheduleOtherDTO>> getDailyScheduleByPlanId(@PathVariable Long planId) {
        List<DailyScheduleOtherDTO> dailySchedules = dailyScheduleService.getDailyScheduleByPlanId(planId);
        return ResponseEntity.ok(dailySchedules);
    }

    @GetMapping("/send-daily-schedules/plan/{planId}")
    public Mono<ResponseEntity<String>> sendDailySchedulesByPlanId(@PathVariable Long planId) {
        List<DailyScheduleOtherDTO> dailySchedules = dailyScheduleService.getDailyScheduleByPlanId(planId);

        return webClient.post()
                .body(Mono.just(dailySchedules), List.class)
                .retrieve()
                .bodyToMono(String.class)
                .map(response -> ResponseEntity.ok(response))
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body(e.getMessage())));
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateDailySchedules(@RequestBody List<DailyScheduleOtherDTO> updatedSchedules) {
        dailyScheduleService.updateDailySchedules(updatedSchedules);
        return ResponseEntity.ok("Schedules updated successfully");
    }

    @PostMapping("/daily-schedules/plan/{planId}/optimize")
    public Mono<ResponseEntity<List<DailyScheduleOtherDTO>>> optimizeDailySchedules(@PathVariable Long planId) throws JsonProcessingException {
        List<DailyScheduleOtherDTO> dailySchedules = dailyScheduleService.getDailyScheduleByPlanId(planId);

        return chatGPTService.callChatGPTAPI(dailySchedules)
                .flatMap(responseContent -> {
                    List<OptimizedScheduleDTO> optimizedSchedules = chatGPTService.parseResponse(responseContent);
                    List<DailyScheduleOtherDTO> updatedSchedules = chatGPTService.updateDailySchedules(dailySchedules, optimizedSchedules);
                    dailyScheduleService.updateDailySchedules(updatedSchedules);
                    return Mono.just(ResponseEntity.ok(updatedSchedules));
                })
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body(List.of())));
    }

    @GetMapping("/evaluate/plan/{planId}")
    public Mono<ResponseEntity<String>> evaluateForString(@PathVariable Long planId) throws JsonProcessingException {
        List<DailyScheduleOtherDTO> dailySchedules = dailyScheduleService.getDailyScheduleByPlanId(planId);

        return chatGPTService.callChatGPTAPIForString(dailySchedules)
                .doOnNext(response -> System.out.println("Evaluation Response: " + response))
                .map(response -> ResponseEntity.ok(response))
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body(e.getMessage())));
    }
}

