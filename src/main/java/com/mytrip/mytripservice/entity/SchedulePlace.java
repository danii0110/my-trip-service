package com.mytrip.mytripservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "schedule_places")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SchedulePlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_place_id")
    private Long schedulePlaceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "schedulePlaces"})
    private DailySchedule dailySchedule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "schedulePlaces"})
    private Place place;

    @Column(name = "duration", nullable = false)
    private Integer duration;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;
}
