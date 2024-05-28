package com.mytrip.mytripservice.model;

import lombok.Data;

@Data
public class DataRequest {
    private String apiUri;
    private String numOfRows;
    private String pageNo;
    private String arrange;
    private String contentTypeId;
    private String contentId;
    private String areaCode;
    private String sigunguCode;
    private String mapX;
    private String mapY;
    private String radius;
    private String keyword;
    private String defaultYN;
    private String firstImageYN;
    private String areacodeYN;
    private String addrinfoYN;
    private String mapinfoYN;
    private String overviewYN;
    private String imageYN;
    private String subImageYN;
}
