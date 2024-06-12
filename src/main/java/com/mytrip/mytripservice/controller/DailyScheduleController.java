package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.entity.DailySchedule;
import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.service.DailyScheduleService;
import com.mytrip.mytripservice.service.PlanService;
import com.mytrip.mytripservice.dto.DailyScheduleRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/daily-schedules")
public class DailyScheduleController {

    private final DailyScheduleService dailyScheduleService;
    private final PlanService planService;

    @Autowired
    public DailyScheduleController(DailyScheduleService dailyScheduleService, PlanService planService) {
        this.dailyScheduleService = dailyScheduleService;
        this.planService = planService;
    }

    @GetMapping
    public ResponseEntity<List<DailySchedule>> getAllDailySchedules() {
        List<DailySchedule> dailySchedules = dailyScheduleService.getAllDailySchedules();
        return ResponseEntity.ok(dailySchedules);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailySchedule> getDailyScheduleById(@PathVariable Long id) {
        Optional<DailySchedule> dailySchedule = dailyScheduleService.getDailyScheduleById(id);
        return dailySchedule.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DailySchedule> createDailySchedule(@RequestBody DailySchedule dailySchedule) {
        // Retrieve the plan based on planId provided in dailySchedule
        Plan plan = planService.getPlanById(dailySchedule.getPlan().getPlanId())
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        // Set the retrieved plan to dailySchedule
        dailySchedule.setPlan(plan);

        DailySchedule createdDailySchedule = dailyScheduleService.createDailySchedule(dailySchedule);
        return ResponseEntity.ok(createdDailySchedule);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DailySchedule> updateDailySchedule(@PathVariable Long id, @RequestBody DailyScheduleRequest dailyScheduleRequest) {
        Plan plan = planService.getPlanById(dailyScheduleRequest.getPlanId())
                .orElseThrow(() -> new RuntimeException("Plan not found"));
        DailySchedule dailyScheduleDetails = DailySchedule.builder()
                .plan(plan)
                .date(dailyScheduleRequest.getDate())
                .startTime(dailyScheduleRequest.getStartTime())
                .endTime(dailyScheduleRequest.getEndTime())
                .duration(dailyScheduleRequest.getDuration())
                .build();
        DailySchedule updatedDailySchedule = dailyScheduleService.updateDailySchedule(id, dailyScheduleDetails);
        return ResponseEntity.ok(updatedDailySchedule);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDailySchedule(@PathVariable Long id) {
        dailyScheduleService.deleteDailySchedule(id);
        return ResponseEntity.noContent().build();
    }
}
