package com.mytrip.mytripservice.dto;

import lombok.Data;

@Data
public class SchedulePlaceDTO {
    private Long placeId;
    private Long schedulePlaceId;
    private Long scheduleId;
    private PlaceDTO place;
    private Integer duration;
    private String startTime;
    private String endTime;
}
