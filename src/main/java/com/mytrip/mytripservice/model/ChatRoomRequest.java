package com.mytrip.mytripservice.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomRequest {
    private long userId;
    private String chattingTitle;
}
