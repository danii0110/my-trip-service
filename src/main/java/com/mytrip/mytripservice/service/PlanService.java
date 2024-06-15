// PlanService.java
package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.dto.PlanDTO;
import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.entity.User;
import com.mytrip.mytripservice.repository.PlanRepository;
import com.mytrip.mytripservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlanService {
    private final PlanRepository planRepository;
    private final UserRepository userRepository;

    @Autowired
    public PlanService(PlanRepository planRepository, UserRepository userRepository) {
        this.planRepository = planRepository;
        this.userRepository = userRepository;
    }

    public List<PlanDTO> getAllPlans() {
        return planRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<PlanDTO> getPlanById(Long id) {
        return planRepository.findById(id).map(this::toDTO);
    }

    @Transactional
    public PlanDTO createPlan(PlanDTO planDTO) {
        User user = userRepository.findById(planDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Plan plan = toEntity(planDTO);
        plan.setUser(user);
        return toDTO(planRepository.save(plan));
    }

    @Transactional
    public PlanDTO updatePlan(Long id, PlanDTO planDetails) {
        return planRepository.findById(id).map(plan -> {
            plan.setTitle(planDetails.getTitle());
            plan.setRegion(planDetails.getRegion());
            plan.setStartDate(planDetails.getStartDate());
            plan.setEndDate(planDetails.getEndDate());
            plan.setTransportation(planDetails.getTransportation());
            plan.setPlanType(planDetails.getPlanType());
            return toDTO(planRepository.save(plan));
        }).orElseThrow(() -> new RuntimeException("Plan not found"));
    }

    @Transactional
    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }

    private PlanDTO toDTO(Plan plan) {
        PlanDTO planDTO = new PlanDTO();
        planDTO.setPlanId(plan.getPlanId());
        planDTO.setUserId(plan.getUser().getUserId());
        planDTO.setTitle(plan.getTitle());
        planDTO.setRegion(plan.getRegion());
        planDTO.setStartDate(plan.getStartDate());
        planDTO.setEndDate(plan.getEndDate());
        planDTO.setTransportation(plan.getTransportation());
        planDTO.setPlanType(plan.getPlanType());
        return planDTO;
    }

    private Plan toEntity(PlanDTO planDTO) {
        Plan plan = new Plan();
        plan.setPlanId(planDTO.getPlanId());
        plan.setTitle(planDTO.getTitle());
        plan.setRegion(planDTO.getRegion());
        plan.setStartDate(planDTO.getStartDate());
        plan.setEndDate(planDTO.getEndDate());
        plan.setTransportation(planDTO.getTransportation());
        plan.setPlanType(planDTO.getPlanType());
        return plan;
    }
}
