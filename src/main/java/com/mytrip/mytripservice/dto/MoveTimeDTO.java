package com.mytrip.mytripservice.dto;

import com.mytrip.mytripservice.entity.Place;
import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.entity.DailySchedule;
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
