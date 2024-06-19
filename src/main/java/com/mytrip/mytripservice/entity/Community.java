package com.mytrip.mytripservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "community")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_id")
    private Long communityId;

    @ManyToOne
    @JoinColumn(name = "plan_id", nullable = false)
    @JsonIgnoreProperties({"user", "dailySchedules", "moveTimes"})
    private Plan plan;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties("communities")
    private User user;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "moderated_at")
    private LocalDateTime moderatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(name = "mates", nullable = false)
    private Mates mates;

    @Enumerated(EnumType.STRING)
    @Column(name = "age_group", nullable = false)
    private AgeGroup ageGroup;

    @Column(name = "view_count", nullable = false)
    private int viewCount = 0;

    @Column(name = "comment_count", nullable = false)
    private int commentCount = 0;

    @Column(name = "scrap_count", nullable = false)
    private int scrapCount = 0;

    @Column(name = "title", length = 255, nullable = false)
    private String title;

    @Column(name = "content", length = 10000, nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "image_id")
    //@JsonIgnoreProperties("communities")
    private CommunityImage image;

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Scrap> scraps;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.moderatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.moderatedAt = LocalDateTime.now();
    }

}

enum Gender {
    MALE, FEMALE, NONE
}

enum Mates {
    ALONE, FAMILY, FRIEND, CHILD, PET
}

enum AgeGroup {
    TEENS, TWENTIES, THIRTIES, FORTIES, FIFTIES, SIXTIES, OLDER, NONE
}
