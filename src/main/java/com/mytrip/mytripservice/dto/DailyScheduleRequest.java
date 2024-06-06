package com.mytrip.mytripservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class DailyScheduleRequest {
    private Long planId;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer duration;
}
