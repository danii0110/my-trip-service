// MoveTimeDTO.java
package com.mytrip.mytripservice.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MoveTimeDTO {
    private Long moveTimeId;
    private Long planId;
    private Long fromPlaceId;
    private Long toPlaceId;
    private Integer moveTime;
    private Long dailyScheduleId;
}
