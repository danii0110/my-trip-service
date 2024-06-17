package com.mytrip.mytripservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "daily_schedules")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class DailySchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long scheduleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "dailySchedules"})
    private Plan plan;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @OneToMany(mappedBy = "dailySchedule", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("dailySchedule")
    private List<SchedulePlace> schedulePlaces;

    // 기본 public 생성자 추가
    public DailySchedule(Long scheduleId) {
        this.scheduleId = scheduleId;
    }
}
