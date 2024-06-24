package com.mytrip.mytripservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "places")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long placeId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private Category category;

    @Column(name = "image", nullable = false)
    private String image;

    @JsonProperty("xCoordinate")
    @Column(name = "x_coordinate", nullable = false)
    private Double xCoordinate;

    @JsonProperty("yCoordinate")
    @Column(name = "y_coordinate", nullable = false)
    private Double yCoordinate;

    // 기본 public 생성자 추가
    public Place(Long placeId) {
        this.placeId = placeId;
    }
}
