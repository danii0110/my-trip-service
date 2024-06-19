package com.mytrip.mytripservice.dto;

import lombok.Data;

@Data
public class MoveTimeDTO {
    private Long moveTimeId;
    private Long planId;
    private Long fromPlaceId;
    private Long toPlaceId;
    private Integer moveTime;
}
