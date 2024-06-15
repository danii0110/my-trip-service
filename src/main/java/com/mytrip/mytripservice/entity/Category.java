package com.mytrip.mytripservice.entity;

public enum Category {
    TOURIST_SPOT("12"), // 여행지
    RESTAURANT("39"), // 음식점
    CULTURAL_FACILITY("14"), // 문화시설
    LEISURE_SPORTS("28"), // 레포츠
    SHOPPING("38"); // 쇼핑

    private final String contentTypeId;

    Category(String contentTypeId) {
        this.contentTypeId = contentTypeId;
    }

    public String getContentTypeId() {
        return contentTypeId;
    }
}
