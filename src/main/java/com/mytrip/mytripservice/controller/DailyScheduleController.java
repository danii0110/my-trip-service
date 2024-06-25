package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.dto.DailyScheduleDTO;
import com.mytrip.mytripservice.dto.DailyScheduleOtherDTO;
import com.mytrip.mytripservice.service.ChatGPTService;
import com.mytrip.mytripservice.service.DailyScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/daily-schedules")
public class DailyScheduleController {

    private final DailyScheduleService dailyScheduleService;

    @Autowired
    public DailyScheduleController(DailyScheduleService dailyScheduleService) {
        this.dailyScheduleService = dailyScheduleService;
    }

    @GetMapping
    public ResponseEntity<List<DailyScheduleDTO>> getAllDailySchedules() {
        List<DailyScheduleDTO> dailySchedules = dailyScheduleService.getAllDailySchedules();
        return ResponseEntity.ok(dailySchedules);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailyScheduleDTO> getDailyScheduleById(@PathVariable Long id) {
        Optional<DailyScheduleDTO> dailySchedule = dailyScheduleService.getDailyScheduleById(id);
        return dailySchedule.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //추가했어요
    @GetMapping("/plan/{planId}")
    public ResponseEntity<List<DailyScheduleOtherDTO>> getDailyScheduleByPlanId(@PathVariable Long planId) {
        List<DailyScheduleOtherDTO> dailySchedules = dailyScheduleService.getDailyScheduleByPlanId(planId);
        return ResponseEntity.ok(dailySchedules);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DailyScheduleDTO> createDailySchedule(@RequestBody DailyScheduleDTO dailyScheduleDTO) {
        DailyScheduleDTO createdDailySchedule = dailyScheduleService.createDailySchedule(dailyScheduleDTO);
        return ResponseEntity.ok(createdDailySchedule);
    }

    @PatchMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DailyScheduleDTO> updateDailySchedule(@PathVariable Long id, @RequestBody DailyScheduleDTO dailyScheduleDetails) {
        DailyScheduleDTO updatedDailySchedule = dailyScheduleService.updateDailySchedule(id, dailyScheduleDetails);
        return ResponseEntity.ok(updatedDailySchedule);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDailySchedule(@PathVariable Long id) {
        dailyScheduleService.deleteDailySchedule(id);
        return ResponseEntity.noContent().build();
    }
}
