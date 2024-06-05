package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.repository.PlanRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

class PlanServiceTest {

    private PlanRepository planRepository;
    private PlanService planService;

    @BeforeEach
    void setUp() {
        planRepository = Mockito.mock(PlanRepository.class);
        planService = new PlanService(planRepository);
    }

    @Test
    void testGetAllPlans() {
        Plan plan1 = Plan.builder().planId(1L).title("Plan 1").build();
        Plan plan2 = Plan.builder().planId(2L).title("Plan 2").build();
        List<Plan> planList = Arrays.asList(plan1, plan2);

        Mockito.when(planRepository.findAll()).thenReturn(planList);

        List<Plan> result = planService.getAllPlans();
        assertEquals(2, result.size());
        assertEquals("Plan 1", result.get(0).getTitle());
        assertEquals("Plan 2", result.get(1).getTitle());
    }

    @Test
    void testGetPlanById() {
        Plan plan = Plan.builder().planId(1L).title("Plan 1").build();
        Mockito.when(planRepository.findById(1L)).thenReturn(Optional.of(plan));

        Optional<Plan> result = planService.getPlanById(1L);
        assertTrue(result.isPresent());
        assertEquals("Plan 1", result.get().getTitle());
    }

    @Test
    void testCreatePlan() {
        Plan plan = Plan.builder().title("New Plan").build();
        Mockito.when(planRepository.save(any(Plan.class))).thenReturn(plan);

        Plan result = planService.createPlan(plan);
        assertNotNull(result);
        assertEquals("New Plan", result.getTitle());
    }

    @Test
    void testUpdatePlan() {
        Plan existingPlan = Plan.builder().planId(1L).title("Plan 1").build();
        Plan updatedPlanDetails = Plan.builder().title("Updated Plan 1").build();
        Mockito.when(planRepository.findById(1L)).thenReturn(Optional.of(existingPlan));
        Mockito.when(planRepository.save(any(Plan.class))).thenReturn(existingPlan);

        Plan result = planService.updatePlan(1L, updatedPlanDetails);
        assertNotNull(result);
        assertEquals("Updated Plan 1", result.getTitle());
    }

    @Test
    void testDeletePlan() {
        Mockito.doNothing().when(planRepository).deleteById(1L);
        planService.deletePlan(1L);
        Mockito.verify(planRepository, Mockito.times(1)).deleteById(1L);
    }
}
