package com.mytrip.mytripservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "places")
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long placeId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "image", nullable = false)
    private String image;

    @Column(name = "x_coordinate", nullable = false)
    private Double xCoordinate;

    @Column(name = "y_coordinate", nullable = false)
    private Double yCoordinate;

    @Enumerated(EnumType.STRING)
    @Column(name = "place_type", nullable = false)
    private PlaceType placeType;

    // 기본 public 생성자 추가
    public Place(Long placeId) {
        this.placeId = placeId;
    }
}
