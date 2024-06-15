// Category.java
package com.mytrip.mytripservice.entity;

public enum Category {
    TOURIST_SPOT("12"),
    RESTAURANT("39"),
    CULTURAL_FACILITY("14"),
    LEISURE_SPORTS("28"),
    SHOPPING("38"),
    ACCOMMODATION("32");

    private final String contentTypeId;

    Category(String contentTypeId) {
        this.contentTypeId = contentTypeId;
    }

    public String getContentTypeId() {
        return contentTypeId;
    }
}
