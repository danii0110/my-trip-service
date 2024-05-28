package com.mytrip.mytripservice.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity //member 클래스가 자동으로 mysql 테이블 생성
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 생성자를 통해서 값 변경 목적으로 접근하는 메시지들 차단
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본 키 생성을 데이터베이스에 위임
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_nickname", length = 255, nullable = false)
    private String nickname;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_type", nullable = false)
    private RoleType roleType;

    @Builder //빌더 패던으로 객체 생성
    public User(String nickname, RoleType roleType) {
        this.nickname = nickname;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.roleType = roleType;
    }

    //엔티티가 처음 저장될 때 실행되는 콜백 메서드
    //createdAt과 createdAt 필드를 현재 시간으로 설정한다.
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    //엔티티가 업데이트될 때 실행되는 콜백 메서드
    //updatedAt 필드를 현재 시간으로 갱신한다.
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
