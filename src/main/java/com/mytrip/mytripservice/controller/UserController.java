package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.dto.PlanDTO;
import com.mytrip.mytripservice.dto.UserDTO;
import com.mytrip.mytripservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{kakaoId}")
    public ResponseEntity<UserDTO> getUserByKakaoId(@PathVariable String kakaoId) {
        Optional<UserDTO> user = userService.getUserByKakaoId(kakaoId);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO user) {
        UserDTO createdUser = userService.createOrUpdateUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDetails) {
        UserDTO updatedUser = userService.createOrUpdateUser(userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    //플랜 조회 때문에 추가
    @GetMapping("/{userId}/plans")
    public ResponseEntity<List<PlanDTO>> getPlansByUserId(@PathVariable Long userId) {
        List<PlanDTO> plans = userService.getPlansByUserId(userId);
        return ResponseEntity.ok(plans);
    }

}
