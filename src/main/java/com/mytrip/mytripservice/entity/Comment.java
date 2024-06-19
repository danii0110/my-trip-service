package com.mytrip.mytripservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @ManyToOne
    @JoinColumn(name = "community_id", nullable = false)
    @JsonIgnore
    private Community community;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "moderated_at")
    private LocalDateTime moderatedAt;

    @Column(name = "content", length = 10000, nullable = false)
    @Setter
    private String content;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.moderatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.moderatedAt = LocalDateTime.now();
    }

    public Comment(Community community, User user, String content) {
        this.community = community;
        this.user = user;
        this.content = content;
    }
}
