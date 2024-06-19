package com.mytrip.mytripservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table (name = "community_image")
public class CommunityImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;

    @Setter
    @Column(name = "image_path", length = 255, nullable = false)
    private String imagePath;

    @OneToMany(mappedBy = "image")
    @JsonIgnore
    private List<Community> communities;

    public static CommunityImage create(String imagePath) {
        CommunityImage communityImage = new CommunityImage();
        communityImage.setImagePath(imagePath);
        return communityImage;
    }
}
