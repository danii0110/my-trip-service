// DailyScheduleDTO.java
package com.mytrip.mytripservice.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class DailyScheduleDTO {
    private Long scheduleId;
    private Long planId;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer duration;
}
