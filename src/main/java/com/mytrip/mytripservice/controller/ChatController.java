package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.entity.ChatMessage;
import com.mytrip.mytripservice.entity.ChatRoom;
import com.mytrip.mytripservice.model.ChatRoomRequest;
import com.mytrip.mytripservice.model.MessageRequest;
import com.mytrip.mytripservice.service.ChatService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/rooms")
    public List<ChatRoom> getChatRooms(@RequestParam long userId) {
        return chatService.getChatRooms(userId);
    }

    @PostMapping("/room")
    public ChatRoom createChatRoom(@RequestBody ChatRoomRequest request) {
        long userId = request.getUserId();
        String chattingTitle = request.getChattingTitle();
        return chatService.createChatRoom(userId, chattingTitle);
    }
    @DeleteMapping("/room/{roomId}")
    public void deleteChatRoom(@PathVariable Long roomId) {
        chatService.deleteChatRoom(roomId);
    }

    @PatchMapping("/room/{roomId}")
    public ChatRoom renameChatRoom(@PathVariable Long roomId, @RequestBody ChatRoomRequest request) {
        return chatService.renameChatRoom(roomId, request.getChattingTitle());
    }

    @GetMapping("/messages/{roomId}")
    public List<ChatMessage> getMessages(@PathVariable long roomId) {
        return chatService.getMessages(roomId);
    }

    @PostMapping("/message")
    public ChatMessage saveMessage(@RequestBody MessageRequest request) {
        long roomId = request.getRoomId();
        String content = request.getContent();
        ChatMessage.MessageSender createdBy = request.getCreatedBy();
        return chatService.saveMessage(roomId, content, createdBy);
    }

    @PostMapping(value = "/chatgpt")
    public Mono<String> getChatResponse(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        return chatService.getChatResponse(message);
    }
}