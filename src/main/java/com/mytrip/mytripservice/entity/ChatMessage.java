package com.mytrip.mytripservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "chat_message")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long messageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatting_room_id")
    @JsonIgnoreProperties({"messages", "hibernateLazyInitializer", "handler"})
    private ChatRoom chatRoom;

    @Enumerated(EnumType.STRING)
    @Column(name = "created_by", nullable = false)
    private MessageSender createdBy;

    @Column(name = "content", nullable = false, length = 10000)
    private String content;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public ChatMessage(ChatRoom chatRoom, MessageSender createdBy, String content) {
        this.chatRoom = chatRoom;
        this.createdBy = createdBy;
        this.content = content;
        this.createdAt = LocalDateTime.now(); // 생성자에서도 설정
    }

    public enum MessageSender {
        USER,
        BOT
    }
}

