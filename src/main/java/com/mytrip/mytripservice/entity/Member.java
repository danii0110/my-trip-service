package com.mytrip.mytripservice.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity //member 클래스가 자동으로 mysql 테이블 생성
@Getter
public class Member {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본 키 생성을 데이터베이스에 위임
    private int id;

    @Column(name = "member_nickname", length = 255)
    private String nickname;

    private LocalDateTime created_at;

    private LocalDateTime moderate_at;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;
}
