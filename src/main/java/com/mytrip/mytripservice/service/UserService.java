package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.dto.UserDTO;
import com.mytrip.mytripservice.entity.RoleType;
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
    public UserDTO createOrUpdateUser(UserDTO userDTO) {
        if (userDTO.getKakaoId() == null || userDTO.getNickname() == null) {
            throw new IllegalArgumentException("Kakao ID and Nickname are required fields.");
        }
        User user = userRepository.findByKakaoId(userDTO.getKakaoId())
                .orElseGet(User::new);

        user.setKakaoId(userDTO.getKakaoId());
        user.setNickname(userDTO.getNickname());
        user.setAccessToken(userDTO.getAccessToken());
        user.setRefreshToken(userDTO.getRefreshToken());
        user.setTokenExpiryTime(userDTO.getTokenExpiryTime());
        user.setRoleType(userDTO.getRoleType() != null ? userDTO.getRoleType() : RoleType.USER);

        logger.info("Saving user: {}", user);
        return toDTO(userRepository.save(user));
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
