package com.mytrip.mytripservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "schedule_places")
public class SchedulePlaces {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_place_id")
    private Long schedulePlaceId;

    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    @JsonBackReference
    private DailySchedule dailySchedule;

    @ManyToOne
    @JoinColumn(name = "place_id", nullable = false)
    private Place place;
}
