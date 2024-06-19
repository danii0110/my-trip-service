package com.mytrip.mytripservice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequestMapping("/login")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @GetMapping("/loginSuccess")
    public String loginSuccess(@AuthenticationPrincipal OAuth2User oauth2User) {
        Map<String, Object> attributes = oauth2User.getAttributes();
        logger.info("Login Success: {}", attributes);
        return "redirect:/"; // 로그인 성공 시 리디렉션할 페이지
    }

    @GetMapping("/loginFailure")
    public String loginFailure() {
        logger.info("Login Failure");
        return "redirect:/login?error"; // 로그인 실패 시 리디렉션할 페이지
    }
}
