package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.dto.CompletePlanDTO;
import com.mytrip.mytripservice.dto.PlanDTO;
import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.service.PlanService;
import com.mytrip.mytripservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    private final PlanService planService;
    private final UserService userService;

    @Autowired
    public PlanController(PlanService planService, UserService userService) {
        this.planService = planService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<PlanDTO>> getAllPlans() {
        List<PlanDTO> plans = planService.getAllPlans();
        return ResponseEntity.ok(plans);
    }

    //추가했어요
    @GetMapping("/plan/{id}")
    public Optional<Plan> getPlanByPlanId(@PathVariable Long id) {
        return planService.getPlanByPlanId(id);
    }

    //추가했어요
    @GetMapping("/user/{id}")
    public Optional<PlanDTO> getOnePlanById(@PathVariable Long id) {
        return planService.getOnePlanById(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanDTO> getPlanById(@PathVariable Long id) {
        Optional<PlanDTO> plan = planService.getPlanById(id);
        return plan.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/unused/{userId}")
    public ResponseEntity<List<PlanDTO>> getUnusedPlansByUserId(@PathVariable Long userId) {
        List<PlanDTO> plans = planService.getUnusedPlansByUserId(userId);
        return ResponseEntity.ok(plans);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PlanDTO> createPlan(@RequestBody PlanDTO plan) {
        PlanDTO createdPlan = planService.createPlan(plan);
        return ResponseEntity.ok(createdPlan);
    }

    @PatchMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PlanDTO> updatePlan(@PathVariable Long id, @RequestBody PlanDTO planDetails) {
        PlanDTO updatedPlan = planService.updatePlan(id, planDetails);
        return ResponseEntity.ok(updatedPlan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        planService.deletePlan(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/complete")
    public ResponseEntity<Long> createCompletePlan(@RequestBody CompletePlanDTO completePlanDTO) {
        Long planId = planService.createCompletePlan(completePlanDTO);
        return ResponseEntity.ok(planId);
    }

    @PostMapping("/cart")
    public ResponseEntity<Void> createCartPlan(@RequestBody CompletePlanDTO completePlanDTO) {
        planService.createCartPlan(completePlanDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/cart/{userId}")
    public ResponseEntity<List<PlanDTO>> getCartPlans(@PathVariable Long userId) {
        List<PlanDTO> plans = planService.getCartPlans(userId);
        return ResponseEntity.ok(plans);
    }
}
