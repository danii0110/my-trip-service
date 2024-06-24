package com.mytrip.mytripservice.dto;

import com.mytrip.mytripservice.entity.SchedulePlace;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class DailyScheduleOtherDTO {
    private Long scheduleId;
    private Long planId;
    private LocalDate date;
    private List<SchedulePlace> schedulePlaces;
}
