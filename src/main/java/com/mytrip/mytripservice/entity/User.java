package com.mytrip.mytripservice.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 가상 pk 식별번호
    @Column(name = "user_id")
    private Long id; // 1 2 3 4 5 6

    @Column(name = "kakao_id", nullable = false, unique = true) // pk 역할
    private String kakaoId; // 카카오 사용자 ID를 저장할 필드 추가 // dain@kakao.com hs@kakaoo.com

    //액세스 토큰 추가 예정
    //리프레시 토큰 추가 예정

    @Column(name = "user_nickname", length = 255, nullable = false)
    private String nickname;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_type", nullable = false)
    private RoleType roleType;

    @Builder
    public User(String kakaoId, String nickname, RoleType roleType) {
        this.kakaoId = kakaoId;
        this.nickname = nickname;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.roleType = roleType;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
