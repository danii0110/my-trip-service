package com.mytrip.mytripservice.dto;

import lombok.Data;

import java.time.LocalTime;

@Data
public class SchedulePlaceDTO {
    private Long placeId;
    private Long schedulePlaceId;
    private Long scheduleId;
    private PlaceDTO place;
    private Integer duration;
    private LocalTime startTime;
    private LocalTime endTime;
}
