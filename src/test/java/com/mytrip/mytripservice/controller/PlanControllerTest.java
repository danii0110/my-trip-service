package com.mytrip.mytripservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mytrip.mytripservice.config.TestSecurityConfig;
import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.service.PlanService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PlanController.class)
@Import(TestSecurityConfig.class)
class PlanControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PlanService planService;

    @Autowired
    private ObjectMapper objectMapper;

    private Plan plan;

    @BeforeEach
    void setUp() {
        plan = Plan.builder().planId(1L).title("Plan 1").build();
    }

    @Test
    void testGetAllPlans() throws Exception {
        Mockito.when(planService.getAllPlans()).thenReturn(Collections.singletonList(plan));

        mockMvc.perform(get("/api/plans"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Plan 1"));
    }

    @Test
    void testGetPlanById() throws Exception {
        Mockito.when(planService.getPlanById(1L)).thenReturn(Optional.of(plan));

        mockMvc.perform(get("/api/plans/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Plan 1"));
    }

    @Test
    void testCreatePlan() throws Exception {
        Mockito.when(planService.createPlan(any(Plan.class))).thenReturn(plan);

        mockMvc.perform(post("/api/plans")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(plan)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Plan 1"));
    }

    @Test
    void testUpdatePlan() throws Exception {
        Mockito.when(planService.updatePlan(eq(1L), any(Plan.class))).thenReturn(plan);

        mockMvc.perform(put("/api/plans/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(plan)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Plan 1"));
    }

    @Test
    void testDeletePlan() throws Exception {
        Mockito.doNothing().when(planService).deletePlan(1L);

        mockMvc.perform(delete("/api/plans/1"))
                .andExpect(status().isNoContent());
    }
}
