package com.mytrip.mytripservice.service;

import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.Token;
import org.apache.commons.text.similarity.LevenshteinDistance;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class NLPService {

    private static final Komoran komoran = new Komoran(DEFAULT_MODEL.FULL);
    private static final LevenshteinDistance levenshteinDistance = new LevenshteinDistance();

    public static boolean isRelatedToTravel(String text) {
        List<String> travelKeywords = Arrays.asList("여행", "일정", "관광", "투어", "휴가", "볼거리");
        List<Token> tokens = komoran.analyze(text).getTokenList();

        for (Token token : tokens) {
            for (String keyword : travelKeywords) {
                if (calculateSimilarity(token.getMorph(), keyword) > 0.8) {
                    return true;
                }
            }
        }

        return false;
    }

    public static boolean isGreeting(String text) {
        List<String> greetings = Arrays.asList("안녕", "안녕하세요", "안녕하십니까", "하이", "헬로");
        List<Token> tokens = komoran.analyze(text).getTokenList();

        for (Token token : tokens) {
            for (String greeting : greetings) {
                if (calculateSimilarity(token.getMorph(), greeting) > 0.8) {
                    return true;
                }
            }
        }

        return false;
    }

    public static boolean isAskingForAccommodation(String text) {
        List<String> accommodationKeywords = Arrays.asList("숙소", "호텔", "모텔", "게스트하우스", "숙박");
        List<Token> tokens = komoran.analyze(text).getTokenList();

        for (Token token : tokens) {
            for (String keyword : accommodationKeywords) {
                if (calculateSimilarity(token.getMorph(), keyword) > 0.8) {
                    return true;
                }
            }
        }

        return false;
    }

    public static boolean isAskingForTravelRecommendations(String text) {
        List<String> recommendationKeywords = Arrays.asList("추천", "가볼만한 곳", "명소", "핫플레이스");
        List<Token> tokens = komoran.analyze(text).getTokenList();

        for (Token token : tokens) {
            for (String keyword : recommendationKeywords) {
                if (calculateSimilarity(token.getMorph(), keyword) > 0.8) {
                    return true;
                }
            }
        }

        return false;
    }

    public static boolean isResponseDuration(String text) {
        return extractDurationFromMessage(text).isPresent();
    }

    private static Optional<String> extractDurationFromMessage(String message) {
        // Implement logic to extract travel duration from the message
        if (message.matches(".*[0-9]+박[0-9]+일.*") || message.matches(".*[0-9]+박") || message.matches(".*[0-9]+일")) {
            return Optional.of(message);
        }
        return Optional.empty();
    }

    private static double calculateSimilarity(String s1, String s2) {
        int maxLen = Math.max(s1.length(), s2.length());
        if (maxLen == 0) {
            return 1.0;
        }
        return (maxLen - levenshteinDistance.apply(s1, s2)) / (double) maxLen;
    }
}
