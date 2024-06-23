package com.mytrip.mytripservice.dto;

import com.mytrip.mytripservice.entity.PlanType;
import com.mytrip.mytripservice.entity.Transportation;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CompletePlanDTO {
    private Long userId;
    private String title;
    private String region;
    private LocalDate startDate;
    private LocalDate endDate;
    private Transportation transportation;
    private PlanType planType;
    private List<DailyScheduleDTO> dailySchedules;
}
