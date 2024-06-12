package com.mytrip.mytripservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "move_times")
public class MoveTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "move_time_id")
    private Long moveTimeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private Plan plan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_place_id", nullable = false)
    private Place fromPlace;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_place_id", nullable = false)
    private Place toPlace;

    @Column(name = "move_time", nullable = false)
    private Integer moveTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "daily_schedule_id")
    private DailySchedule dailySchedule;
}
