package com.mytrip.mytripservice.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference; // Import 추가
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
//인자가 없는 기본 생성자를 생성하되 접근 수준을 PROTECTED로 설정
//PROTECTED: 무분별한 객체 생성에 대해 한 번 더 체크
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "plans")
public class Plan {
    @Id
    //기본 키 생성 전략을 IDENTITY로 설정하여 데이터베이스가 자동으로 키를 생성
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plan_id")
    private Long planId;

    //LAZY 로딩을 사용하여 필요할 때만 데이터를 가져옴
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference // Jackson이 직렬화할 때 순환 참조를 피하도록 설정
    private User user;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "region", nullable = false)
    private String region;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    //열거형 타입을 문자열로 데이터베이스에 저장
    @Enumerated(EnumType.STRING)
    @Column(name = "transportation")
    private Transportation transportation;

    //열거형 타입을 문자열로 데이터베이스에 저장
    @Enumerated(EnumType.STRING)
    @Column(name = "plan_type")
    private PlanType planType;
}
