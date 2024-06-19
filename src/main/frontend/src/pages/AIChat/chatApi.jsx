import axios from 'axios';

const chatApi = axios.create({
    baseURL: 'http://localhost:8080/chat', // 백엔드 서버 주소
});

export const getChatRooms = (userId) => {
    return chatApi.get(`/rooms?userId=${userId}`);
};

// 채팅방 생성
export const createChatRoom = (userId, chattingTitle) => {
    return chatApi.post('/room', {
        userId: userId,
        chattingTitle: chattingTitle
    });
};

// 메시지 저장
export const saveMessage = (roomId, content, createdBy) => {
    return chatApi.post('/message', {
        roomId: roomId,
        content: content,
        createdBy: createdBy
    });
};

export const deleteChatRoom = (roomId) => {
    return chatApi.delete(`/room/${roomId}`);
};

export const renameChatRoom = (roomId, newTitle) => {
    return chatApi.patch(`/room/${roomId}`, { chattingTitle: newTitle });
    //return api.patch(`/room/${roomId}/${newTitle}`);
};

export const getMessages = (roomId) => {
    return chatApi.get(`/messages/${roomId}`);
};

export const getChatResponse = (message) => {
    return chatApi.post('/chatgpt', { message });
};
