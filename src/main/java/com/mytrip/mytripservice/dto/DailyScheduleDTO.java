package com.mytrip.mytripservice.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class DailyScheduleDTO {
    private Long scheduleId;
    private Long planId;
    private LocalDate date;
    private List<SchedulePlaceDTO> schedulePlaces;
}
