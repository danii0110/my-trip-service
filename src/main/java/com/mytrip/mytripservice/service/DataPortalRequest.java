package com.mytrip.mytripservice.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.mytrip.mytripservice.model.DataRequest;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Component
public class DataPortalRequest {

    @Value("${public-data.korservice.key.decoding}")
    private String serviceKey;
    @Value("${public-data.korservice.url}")
    private String serviceURL;

    private final WebClient webClient;

    public DataPortalRequest() {
        ObjectMapper objectMapper = Jackson2ObjectMapperBuilder.json()
                .modules(new JavaTimeModule())
                .featuresToDisable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
                .featuresToEnable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT)
                .build();

        // WebClient 빌더 설정
        this.webClient = WebClient.builder()
                .codecs(configurer -> configurer.defaultCodecs().jackson2JsonDecoder(
                        new Jackson2JsonDecoder(objectMapper)))
                .build();
    }

    public UriComponentsBuilder makeBasicUrl(String apiUri, String numOfRows, String pageNo) throws UnsupportedEncodingException {
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl(serviceURL + apiUri)
                .queryParam("MobileOS", "ETC")
                .queryParam("MobileApp", "AppTest")
                .queryParam("_type", "json")
                .queryParam("serviceKey", serviceKey)
                .queryParam("numOfRows", numOfRows)
                .queryParam("pageNo", pageNo); // 출력할 데이터 개수
        return builder;
    }

    public String makeDataUrl(DataRequest request) throws UnsupportedEncodingException {
        UriComponentsBuilder builder = makeBasicUrl(request.getApiUri(), request.getNumOfRows(), request.getPageNo());

        if (request.getArrange() != null) {
            builder.queryParam("arrange", "D");
        }
        if (request.getContentTypeId() != null) {
            builder.queryParam("contentTypeId", request.getContentTypeId());
        }
        if (request.getContentId() != null) {
            builder.queryParam("contentId", request.getContentId());
        }
        if (request.getAreaCode() != null) {
            builder.queryParam("areaCode", request.getAreaCode());
        }
        if (request.getSigunguCode() != null) {
            builder.queryParam("sigunguCode", request.getSigunguCode());
        }
        if (request.getMapX() != null) {
            builder.queryParam("mapX", request.getMapX());
        }
        if (request.getMapY() != null) {
            builder.queryParam("mapY", request.getMapY());
        }
        if (request.getRadius() != null) {
            builder.queryParam("radius", request.getRadius());
        }
        if (request.getKeyword() != null) {
            builder.queryParam("keyword", request.getKeyword());
        }
        if (request.getDefaultYN() != null) {
            builder.queryParam("defaultYN", "Y");
        }
        if (request.getAddrinfoYN() != null) {
            builder.queryParam("addrinfoYN", "Y");
        }
        if (request.getMapinfoYN() != null) {
            builder.queryParam("mapinfoYN", "Y");
        }
        if (request.getOverviewYN() != null) {
            builder.queryParam("overviewYN", "Y");
        }
        if (request.getSubImageYN() != null) {
            builder.queryParam("subImageYN", "Y");
        }

        String uriString = builder.toUriString();
        uriString = URLDecoder.decode(uriString, "UTF-8");

        return uriString;
    }

    public <T> Mono<T> fetchData(String url, Class<T> responseType) throws UnsupportedEncodingException {
        System.out.println("url: " + url);
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(responseType) // JSON을 해당 데이터 모델로 자동 파싱
                .doOnNext(response -> System.out.println("Fetched data: " + response))
                .doOnError(error -> System.err.println("Error fetching data: " + error.getMessage()));
    }
}
