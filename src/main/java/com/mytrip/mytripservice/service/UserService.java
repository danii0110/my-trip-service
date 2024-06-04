package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.entity.User;
import com.mytrip.mytripservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setNickname(userDetails.getNickname());
            user.setAccessToken(userDetails.getAccessToken());
            user.setRefreshToken(userDetails.getRefreshToken());
            user.setTokenExpiryTime(userDetails.getTokenExpiryTime());
            user.setRoleType(userDetails.getRoleType());
            user.setUpdatedAt(LocalDateTime.now()); // 여기에 추가적인 설정
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
