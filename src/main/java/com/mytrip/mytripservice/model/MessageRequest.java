package com.mytrip.mytripservice.model;

import com.mytrip.mytripservice.entity.ChatMessage;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class MessageRequest {
    private long roomId;
    private String content;
    private ChatMessage.MessageSender createdBy;
}
