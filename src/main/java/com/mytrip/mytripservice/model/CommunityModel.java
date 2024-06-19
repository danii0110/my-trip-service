package com.mytrip.mytripservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommunityModel {
    private String userNickname;
    private String areaCode;
    private String sigunguCode;
    private int year;
    private int month;
    private String imageSrc;
    private String title;
    private int viewCount;
    private int commentCount;
    private int scrapCount;
    private Long communityId;

    public CommunityModel(String nickname, String areaCode, String sigunguCode, int year, int month, String imagePath, String title, int viewCount, int commentCount, int scrapCount, Long communityId) {
        this.userNickname = nickname;
        this.areaCode = areaCode;
        this.sigunguCode = sigunguCode;
        this.year = year;
        this.month = month;
        this.imageSrc = imagePath;
        this.title = title;
        this.viewCount = viewCount;
        this.commentCount = commentCount;
        this.scrapCount = scrapCount;
        this.communityId = communityId;
    }
}
