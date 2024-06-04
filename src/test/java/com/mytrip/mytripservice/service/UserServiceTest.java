package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.entity.User;
import com.mytrip.mytripservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

class UserServiceTest {

    private UserRepository userRepository;
    private UserService userService;

    @BeforeEach
    void setUp() {
        //UserRepository를 모킹
        userRepository = Mockito.mock(UserRepository.class);
        //모킹된 UserRepository를 사용하여 UserService를 초기화
        userService = new UserService(userRepository);
    }

    @Test
    void testGetAllUsers() {
        User user1 = User.builder().userId(1L).nickname("user1").build();
        User user2 = User.builder().userId(2L).nickname("user2").build();
        List<User> userList = Arrays.asList(user1, user2);
        //목 객체 설정
        Mockito.when(userRepository.findAll()).thenReturn(userList);

        List<User> result = userService.getAllUsers();
        assertEquals(2, result.size());
        assertEquals("user1", result.get(0).getNickname());
        assertEquals("user2", result.get(1).getNickname());
    }

    @Test
    void testGetUserById() {
        //테스트용 User 객체를 생성
        User user1 = User.builder().userId(1L).nickname("user1").build();
        //userRepository.findById 호출 시, 미리 정의한 User 객체를 반환하도록 설정
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user1));

        //userService.getUserById 메서드를 호출하고 결과를 검증
        Optional<User> result = userService.getUserById(1L);
        assertTrue(result.isPresent());
        assertEquals("user1", result.get().getNickname());
    }

    @Test
    void testCreateUser() {
        User user1 = User.builder().nickname("user1").build();
        Mockito.when(userRepository.save(any(User.class))).thenReturn(user1);

        User result = userService.createUser(user1);
        assertNotNull(result);
        assertEquals("user1", result.getNickname());
    }

    @Test
    void testUpdateUser() {
        User existingUser = User.builder().userId(1L).nickname("user1").build();
        User updatedUserDetails = User.builder().nickname("user1Updated").build();
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));
        Mockito.when(userRepository.save(any(User.class))).thenReturn(existingUser);

        User result = userService.updateUser(1L, updatedUserDetails);
        assertNotNull(result);
        assertEquals("user1Updated", result.getNickname());
    }

    @Test
    void testDeleteUser() {
        Mockito.doNothing().when(userRepository).deleteById(1L);
        userService.deleteUser(1L);
        Mockito.verify(userRepository, Mockito.times(1)).deleteById(1L);
    }
}