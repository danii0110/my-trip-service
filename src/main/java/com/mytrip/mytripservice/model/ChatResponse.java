package com.mytrip.mytripservice.model;

import lombok.Data;

@Data
public class ChatResponse {
    private String message;

    public ChatResponse(String message) {
        this.message = message;
    }
}
