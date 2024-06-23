package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.dto.UserDTO;
import com.mytrip.mytripservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class OAuth2Controller {

    private static final Logger logger = LoggerFactory.getLogger(OAuth2Controller.class);

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String redirectUri;

    @Autowired
    private UserService userService;

    @PostMapping("/login/oauth2/code/kakao")
    public ResponseEntity<?> loginWithKakao(@RequestBody Map<String, String> request) {
        String code = request.get("code");

        logger.info("Received authorization code: {}", code);

        try {
            String tokenUrl = "https://kauth.kakao.com/oauth/token";
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("grant_type", "authorization_code");
            params.add("client_id", clientId);
            params.add("redirect_uri", redirectUri);
            params.add("code", code);
            params.add("client_secret", clientSecret);

            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);
            ResponseEntity<Map> responseEntity = restTemplate.postForEntity(tokenUrl, requestEntity, Map.class);

            if (responseEntity.getStatusCode() != HttpStatus.OK) {
                logger.error("Error requesting access token: {}", responseEntity);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error requesting access token");
            }

            Map<String, Object> tokenResponse = responseEntity.getBody();
            String accessToken = (String) tokenResponse.get("access_token");
            String refreshToken = (String) tokenResponse.get("refresh_token");
            Integer expiresIn = (Integer) tokenResponse.get("expires_in");
            LocalDateTime tokenExpiryTime = LocalDateTime.now().plusSeconds(expiresIn);

            logger.info("Received access token: {}", accessToken);
            logger.info("Received refresh token: {}", refreshToken);
            logger.info("Token expires in: {} seconds", expiresIn);

            String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
            headers.set("Authorization", "Bearer " + accessToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, Map.class);

            if (userInfoResponse.getStatusCode() != HttpStatus.OK) {
                logger.error("Error requesting user info: {}", userInfoResponse);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error requesting user info");
            }

            logger.info("Received user info: {}", userInfoResponse.getBody());

            Map<String, Object> userInfo = userInfoResponse.getBody();
            String kakaoId = userInfo.get("id").toString();
            String nickname = ((Map<String, Object>) userInfo.get("properties")).get("nickname").toString();

            UserDTO userDTO = new UserDTO();
            userDTO.setKakaoId(kakaoId);
            userDTO.setNickname(nickname);
            userDTO.setAccessToken(accessToken);
            userDTO.setRefreshToken(refreshToken);
            userDTO.setTokenExpiryTime(tokenExpiryTime);

            userService.createOrUpdateUser(userDTO);

            Map<String, Object> result = new HashMap<>(userInfo);
            result.put("access_token", accessToken);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("Error during Kakao login process", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during Kakao login process");
        }
    }

    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String token) {
        try {
            String accessToken = token.replace("Bearer ", "");

            String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, Map.class);

            if (userInfoResponse.getStatusCode() != HttpStatus.OK) {
                logger.error("Error requesting user info: {}", userInfoResponse);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error requesting user info");
            }

            logger.info("Received user info: {}", userInfoResponse.getBody());
            return ResponseEntity.ok(userInfoResponse.getBody());
        } catch (Exception e) {
            logger.error("Error getting user info", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting user info");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String, String> request) {
        String accessToken = request.get("access_token");
        // 로그아웃 관련 로직을 여기에 추가
        // 필요시 세션 무효화 등 추가 작업 수행
        return ResponseEntity.ok().build();
    }
}

