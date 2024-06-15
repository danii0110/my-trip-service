// PlanDTO.java
package com.mytrip.mytripservice.dto;

import com.mytrip.mytripservice.entity.PlanType;
import com.mytrip.mytripservice.entity.Transportation;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PlanDTO {
    private Long planId;
    private Long userId;
    private String title;
    private String region;
    private LocalDate startDate;
    private LocalDate endDate;
    private Transportation transportation;
    private PlanType planType;
}
