import styles from './AIChatPage.module.scss';
import Header from "../../components/layouts/Header";
import React, {useEffect, useState} from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import {useLocation, useNavigate} from "react-router-dom";
import {getChatRooms, createChatRoom, deleteChatRoom, renameChatRoom, getMessages, saveMessage, getChatResponse} from './chatApi';

const AIChatPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const roomId = Number(queryParams.get("room-id"));

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeRoom, setActiveRoom] = useState(null);
    const [chatRooms, setChatRooms] = useState([]);
    const [messages, setMessages] = useState([]);
    const userId = 1;

    useEffect(()=> {
        fetchChatRooms(userId);
        if (roomId) {
            fetchMessages(roomId)
        }
    }, []);

    useEffect(() => {
        if (roomId) {
            fetchMessages(roomId);
            const activeRoomDetails = chatRooms.find(room => room.chattingRoomId === roomId);
            if (activeRoomDetails)
                setActiveRoom(activeRoomDetails);
        }
    }, [roomId]);

    useEffect(()=> {
        console.log("chatpage");
        console.log(messages);
    }, [messages])

    const fetchChatRooms = async () => {
        try {
            const response = await getChatRooms();
            setChatRooms(response.data ? response.data : []);
        } catch (error) {
            console.error("Failed to fetch chat rooms:", error); // 오류 처리 추가
        }
    };

    const fetchMessages = async (roomId) => {
        try {
            setMessages([]);
            const response = await getMessages(roomId);
            const fetchedMessages = response.data.map(msg => ({
                id: msg.messageId,
                text: msg.content,
                sender: msg.createdBy.toLowerCase()
            }));
            setMessages(fetchedMessages.length > 0 ? fetchedMessages : []);
        } catch (error) {
            console.error("Failed to fetch chat messages:", error);
        }

    };

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    }

    const handleDeleteChatRoom = async (roomId) => {
        try {
            await deleteChatRoom(roomId);
            await fetchChatRooms(localStorage.getItem("userId"));

            if (String(activeRoom.chattingRoomId) === String(roomId)) {
                setActiveRoom(null);
                navigate('/ai-chat');
            }

        } catch (error) {
            console.error("Failed to delete chat room:", error); // 오류 처리 추가
        }
    };

    const handleRenameChatRoom = async (roomId, newTitle) => {
        try {
            const response = await renameChatRoom(roomId, newTitle);
            const updatedRoom = response.data;
            setChatRooms(chatRooms.map(room =>
                room.chattingRoomId === roomId ? updatedRoom : room
            ));
        } catch (error) {
            console.error("Failed to rename chat room:", error); // 오류 처리 추가
        }
    };

    const handleCreateChatRoom = async (roomName) => {
        try {
            //await createChatRoom(userId, roomName);
            const response = await createChatRoom(userId, roomName);
            return response.data;
        } catch (error) {
            console.error("Failed to create chat room:", error); // 오류 처리 추가
        }
    };

    const fetchBotResponse = async (roomId, text, updateBotMessage) => {
        try {
            const response = await getChatResponse(roomId, text);
            const content = response.data.choices[0].message.content;
            updateBotMessage(content);
        } catch (error) {
            console.error("Failed to fetch bot response:", error);
            updateBotMessage("응답을 받아오지 못했습니다.");
        }
    };

    const handleSendMessage = async (room, text) => {
        let roomId = room;
        let newRoom = null;

        if (!roomId) {
            console.log("No active room, creating a new one..."); // 디버깅 로그 추가
            newRoom = await handleCreateChatRoom("New Chat Room");
            roomId = newRoom.chattingRoomId;
            setActiveRoom(newRoom);
            navigate(`/ai-chat?room-id=${roomId}`);
            setMessages([]);
            await fetchChatRooms(); // 새로 생성된 채팅방 목록을 다시 불러옵니다.
            await fetchMessages(roomId); // 새로 생성된 채팅방의 메시지를 불러옵니다.
        }

        console.log("start");

        const newMessage = { id: messages.length ? messages.length + 1 : 0, text: text, sender: "user" };
        setMessages(prevMessages => [...prevMessages, newMessage]);

        try {
            await saveMessage(roomId, text, "USER"); // 메시지 저장
        } catch (error) {
            console.error("Failed to save user message:", error); // 오류 처리 추가
        }
        console.log("userMessage");

        const botMessage = { id: Date.now(), text: "답변을 입력 중입니다...", sender: "bot" };
        setMessages(prevMessages => [...prevMessages, botMessage]);
        console.log("loading");

        await fetchBotResponse(roomId, text, async (chunk) => {
            setMessages(prevMessages => prevMessages.map(msg =>
                msg.id === botMessage.id ? { ...msg, text: chunk } : msg
            ));
            try {
                await saveMessage(roomId, chunk, "BOT"); // 봇 메시지 저장
            } catch (error) {
                console.error("Failed to save bot message:", error); // 오류 처리 추가
            }
        });

        console.log("botmessage");
    }

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.aiChat}>
                {isSidebarOpen &&
                    <Sidebar
                        toggleSidebar={toggleSidebar}
                        handleDeleteChatRoom={handleDeleteChatRoom}
                        handleRenameChatRoom={handleRenameChatRoom}
                        chatRooms={chatRooms}
                        activeRoom={activeRoom}
                        setActiveRoom={setActiveRoom}
                    />
                }
                <div className={`${styles.chat} ${!isSidebarOpen ? styles.fullWidthChat : ''}`}>
                    <Chat
                        roomId={roomId}
                        messages={messages}
                        setMessages={setMessages}
                        onSendMessage={handleSendMessage}
                        activeRoom={activeRoom}
                        setActiveRoom={setActiveRoom}
                        toggleSidebar={toggleSidebar}
                        isSidebarOpen={isSidebarOpen}
                    />
                </div>
            </div>
        </div>
    );
};
export default AIChatPage;