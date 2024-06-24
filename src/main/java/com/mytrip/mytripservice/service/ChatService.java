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
import java.util.stream.Collectors;

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

    public Mono<String> getChatResponse(long roomId, String message) {
        List<ChatMessage> lastFiveMessages = chatMessageRepository.findTop5ByChatRoom_ChattingRoomIdOrderByMessageIdDesc(roomId);

        // Convert messages to OpenAI API format
        List<Map<String, String>> messages = lastFiveMessages.stream()
                .map(chatMessage -> Map.of(
                        "role", chatMessage.getCreatedBy() == ChatMessage.MessageSender.USER ? "user" : "assistant",
                        "content", chatMessage.getContent()
                ))
                .collect(Collectors.toList());

        messages.add(Map.of("role", "user", "content", message));

        // Define the default system prompt
        String defaultPrompt = "You are a travel itinerary planner chatbot for domestic travel in South Korea. " +
                "You can only answer questions related to travel plans within South Korea." +
                "All responses must be in Korean. Provide detailed information including specific times and places";

        // Detect additional context and create additional prompt
        String additionalPrompt = "";
        if (NLPService.isGreeting(message)) {
            additionalPrompt = "Just greet the user";
        } else if (NLPService.isRelatedToTravel(message) || NLPService.isResponseDuration(message)) {
            additionalPrompt = "From the context of previous messages, derive the travel location and duration if available. " +
                    "If the location is not mentioned, ask for the location. If the duration is not mentioned, ask for the duration. " +
                    "If both are mentioned, provide a detailed itinerary with specific times and places." +
                    "Respond in the format '1일차: {시작시간} ~ {종료시간} {장소}' and include accommodation details.";
        } else if (NLPService.isAskingForAccommodation(message)) {
            additionalPrompt = "From the context of previous messages, derive the travel location if available. " +
                    "If the location is not mentioned, ask for the location. Then provide accommodation recommendations.";
        } else if (NLPService.isAskingForTravelRecommendations(message)) {
            additionalPrompt = "Recommend a travel destination based on previous context or the provided message. " +
                    "If the location is mentioned, give detailed recommendations for that location.";
        } else {
            additionalPrompt = "I'm a travel planner chatbot for domestic travel in South Korea." +
                    "Please ask questions related to travel itineraries.";
        }

        // Add the new user message at the end
        messages.add(0, Map.of("role", "system", "content", defaultPrompt));
        messages.add(Map.of("role", "system", "content", additionalPrompt));

        Map<String, Object> body = new HashMap<>();
        body.put("model", "gpt-3.5-turbo");
        body.put("messages", messages);

        String finalAdditionalPrompt = additionalPrompt;

        return webClient.post()
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .doOnNext(response -> System.out.println("Response data: " + response))
                .doOnError(error -> System.err.println("Error: " + error.getMessage()));
    }

}
