package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plans")
public class PlanController {
    private final PlanService planService;

    @Autowired
    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping
    public ResponseEntity<List<Plan>> getAllPlans() {
        List<Plan> plans = planService.getAllPlans();
        return ResponseEntity.ok(plans);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plan> getPlanById(@PathVariable Long id) {
        Optional<Plan> plan = planService.getPlanById(id);
        return plan.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Plan> createPlan(@RequestBody Plan plan) {
        Plan createdPlan = planService.createPlan(plan);
        return ResponseEntity.ok(createdPlan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Plan> updatePlan(@PathVariable Long id, @RequestBody Plan planDetails) {
        Plan updatedPlan = planService.updatePlan(id, planDetails);
        return ResponseEntity.ok(updatedPlan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        planService.deletePlan(id);
        return ResponseEntity.noContent().build();
    }
}
