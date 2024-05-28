package com.mytrip.mytripservice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationOverview {
    private Response response;

    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Response {
        private Body body;
    }

    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Body {
        private Items items;
        private String totalCount;
    }

    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Items {
        @JsonProperty("item")
        private List<Item> item;
    }

    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Item {
        private String addr1; //주소
        private String addr2; //상세 주소
        private String title; //콘텐츠 제목
        private String areacode; //지역코드
        private String booktour; //교과서 속 여행지 여부
        private String cat1; //대분류
        private String cat2; //중분류
        private String cat3; //소분류
        private String contentid; //콘텐츠ID
        private String contenttypeid; //콘텐츠타입ID
        private String createdtime; //등록일
        private String homepage; //홈페이지 주소
        private String firstimage; //대표이미지 원본
        private String firstimage2; //대표이미지 압축본
        private String cpyrhtDivCd; //저작권 유형
        private String mapx; //GPS X좌표
        private String mapy; //GPS Y좌표
        private String mlevel; //Map level 응답
        private String modifiedtime; //수정일
        private String sigungucode; //시군구코드
        private String tel; //전화번호
        private String zipcode; //우편번호
        private String overview; //개요
        private String imgname;
        private String originimgurl;
        private String serialnum;
        private String smaillimageurl;
    }
}
