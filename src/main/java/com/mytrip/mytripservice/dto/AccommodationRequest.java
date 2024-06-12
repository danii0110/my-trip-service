package com.mytrip.mytripservice.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccommodationRequest {
    private Long planId;
    private String name;
    private String address;
    private String category;
    private String image;
    private Double xCoordinate;
    private Double yCoordinate;
    private String startDate;
    private String endDate;
}
