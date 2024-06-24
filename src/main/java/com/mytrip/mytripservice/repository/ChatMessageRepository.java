package com.mytrip.mytripservice.repository;

import com.mytrip.mytripservice.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByChatRoom_ChattingRoomId(long roomId);
    List<ChatMessage> findTop5ByChatRoom_ChattingRoomIdOrderByMessageIdDesc(long chattingRoomId);
}
