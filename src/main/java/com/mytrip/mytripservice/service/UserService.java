// UserService.java
package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.dto.UserDTO;
import com.mytrip.mytripservice.entity.User;
import com.mytrip.mytripservice.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id).map(this::toDTO);
    }

    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        if (userDTO.getKakaoId() == null || userDTO.getNickname() == null) {
            throw new IllegalArgumentException("Kakao ID and Nickname are required fields.");
        }
        User user = toEntity(userDTO);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        logger.info("Creating user: {}", user);
        return toDTO(userRepository.save(user));
    }

    @Transactional
    public UserDTO updateUser(Long id, UserDTO userDetails) {
        return userRepository.findById(id).map(user -> {
            if (userDetails.getNickname() != null) {
                user.setNickname(userDetails.getNickname());
            }
            if (userDetails.getAccessToken() != null) {
                user.setAccessToken(userDetails.getAccessToken());
            }
            if (userDetails.getRefreshToken() != null) {
                user.setRefreshToken(userDetails.getRefreshToken());
            }
            if (userDetails.getTokenExpiryTime() != null) {
                user.setTokenExpiryTime(userDetails.getTokenExpiryTime());
            }
            if (userDetails.getRoleType() != null) {
                user.setRoleType(userDetails.getRoleType());
            }
            user.setUpdatedAt(LocalDateTime.now());
            return toDTO(userRepository.save(user));
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    private UserDTO toDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setKakaoId(user.getKakaoId());
        userDTO.setNickname(user.getNickname());
        userDTO.setAccessToken(user.getAccessToken());
        userDTO.setRefreshToken(user.getRefreshToken());
        userDTO.setTokenExpiryTime(user.getTokenExpiryTime());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setUpdatedAt(user.getUpdatedAt());
        userDTO.setRoleType(user.getRoleType());
        return userDTO;
    }

    private User toEntity(UserDTO userDTO) {
        User user = new User();
        user.setUserId(userDTO.getUserId());
        user.setKakaoId(userDTO.getKakaoId());
        user.setNickname(userDTO.getNickname());
        user.setAccessToken(userDTO.getAccessToken());
        user.setRefreshToken(userDTO.getRefreshToken());
        user.setTokenExpiryTime(userDTO.getTokenExpiryTime());
        user.setCreatedAt(userDTO.getCreatedAt());
        user.setUpdatedAt(userDTO.getUpdatedAt());
        user.setRoleType(userDTO.getRoleType());
        return user;
    }
}
