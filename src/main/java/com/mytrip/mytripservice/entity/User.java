package com.mytrip.mytripservice.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference; // Import 추가
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "kakao_id", nullable = false, unique = true)
    private String kakaoId;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "token_expiry_time")
    private LocalDateTime tokenExpiryTime;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_type", nullable = false)
    private RoleType roleType;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Jackson이 직렬화할 때 순환 참조를 피하도록 설정
    private List<Plan> plans;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", kakaoId='" + kakaoId + '\'' +
                ", nickname='" + nickname + '\'' +
                ", accessToken='" + accessToken + '\'' +
                ", refreshToken='" + refreshToken + '\'' +
                ", tokenExpiryTime=" + tokenExpiryTime +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", roleType=" + roleType +
                ", plans=" + plans +
                '}';
    }
}
