// PlaceDTO.java
package com.mytrip.mytripservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mytrip.mytripservice.entity.Category;
import lombok.Data;

@Data
public class PlaceDTO {
    private Long placeId;
    private String name;
    private String address;
    private Category category;
    private String image;

    @JsonProperty("xCoordinate")
    private Double xCoordinate;

    @JsonProperty("yCoordinate")
    private Double yCoordinate;
}
