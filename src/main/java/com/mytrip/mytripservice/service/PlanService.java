package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlanService {
    private final PlanRepository planRepository;

    @Autowired
    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }

    public Optional<Plan> getPlanById(Long id) {
        return planRepository.findById(id);
    }

    public Plan createPlan(Plan plan) {
        return planRepository.save(plan);
    }

    public Plan updatePlan(Long id, Plan planDetails) {
        return planRepository.findById(id).map(plan -> {
            plan.setTitle(planDetails.getTitle());
            plan.setRegion(planDetails.getRegion());
            plan.setStartDate(planDetails.getStartDate());
            plan.setEndDate(planDetails.getEndDate());
            plan.setTransportation(planDetails.getTransportation());
            plan.setPlanType(planDetails.getPlanType());
            return planRepository.save(plan);
        }).orElseThrow(() -> new RuntimeException("Plan not found"));
    }

    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }
}
