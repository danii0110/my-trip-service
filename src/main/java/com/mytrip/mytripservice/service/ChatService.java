package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.entity.ChatMessage;
import com.mytrip.mytripservice.entity.ChatRoom;
import com.mytrip.mytripservice.entity.User;
import com.mytrip.mytripservice.repository.ChatMessageRepository;
import com.mytrip.mytripservice.repository.ChatRoomRepository;
import com.mytrip.mytripservice.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {
    private final WebClient webClient;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    public ChatService(WebClient webClient, ChatRoomRepository chatRoomRepository, ChatMessageRepository chatMessageRepository, UserRepository userRepository) {
        this.webClient = webClient;
        this.chatRoomRepository = chatRoomRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.userRepository = userRepository;
    }

    public List<ChatRoom> getChatRooms(long userId) {
        return chatRoomRepository.findByUser_UserId(userId);
    }

    public ChatRoom createChatRoom(long userId, String chattingTitle) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        ChatRoom chatRoom = new ChatRoom(user, chattingTitle);
        chatRoomRepository.save(chatRoom);
        return chatRoom;
    }

    public void deleteChatRoom(Long roomId) {
        chatRoomRepository.deleteById(roomId);
    }

    public ChatRoom renameChatRoom(Long roomId, String newTitle) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(() -> new IllegalArgumentException("Invalid room ID"));
        chatRoom.setChattingTitle(newTitle);
        return chatRoomRepository.save(chatRoom);
    }

    public ChatMessage saveMessage(long roomId, String content, ChatMessage.MessageSender createdBy) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid room ID"));
        ChatMessage chatMessage = new ChatMessage(chatRoom, createdBy, content);
        return chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> getMessages(long roomId) {
        return chatMessageRepository.findByChatRoom_ChattingRoomId(roomId);
    }

    public Mono<String> getChatResponse(String message) {
        Map<String, Object> body = new HashMap<>();
        body.put("model", "gpt-3.5-turbo");
        body.put("messages", List.of(Map.of("role", "user", "content", message)));

        return webClient.post()
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .doOnNext(response -> System.out.println("Response data: " + response))
                .doOnError(error -> System.err.println("Error: " + error.getMessage()));
    }

}
