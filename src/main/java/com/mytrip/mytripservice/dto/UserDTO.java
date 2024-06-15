// UserDTO.java
package com.mytrip.mytripservice.dto;

import com.mytrip.mytripservice.entity.RoleType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDTO {
    private Long userId;
    private String kakaoId;
    private String nickname;
    private String accessToken;
    private String refreshToken;
    private LocalDateTime tokenExpiryTime;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private RoleType roleType;
}
