import styles from './AIChatPage.module.scss';
import Header from "../../components/layouts/Header";
import React, {useEffect, useState} from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getChatRooms, createChatRoom, deleteChatRoom, renameChatRoom, getMessages, saveMessage, getChatResponse} from './chatApi';

const AIChatPage = () => {
    const userId = 1; // 하드코딩된 유저 ID, 나중에 로그인 기능으로 대체
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const roomId = queryParams.get("room-id");

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeRoom, setActiveRoom] = useState(roomId || null);
    const [chatRooms, setChatRooms] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchChatRooms();
    }, []);

    useEffect(() => {
        if (roomId) {
            const activeRoomDetails = chatRooms.find(room => room.chattingRoomId === Number(roomId));
            setActiveRoom(activeRoomDetails);
            fetchMessages(roomId);
        }
        // if (roomId) {
        //     setActiveRoom(roomId);
        //     fetchMessages(roomId);
        // }
        // console.log(`Active room changed to: ${activeRoom}`);
        // console.log(`Active roomId changed to: ${roomId}`);
    }, [roomId, activeRoom]);

    useEffect(() => {
        console.log("message: " + messages);
    }, [messages])

    const fetchChatRooms = async () => {
        try {
            const response = await getChatRooms(userId);
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

    const handleCreateChatRoom = async (roomName) => {
        try {
            setActiveRoom(null);
            //await createChatRoom(userId, roomName);
            const response = await createChatRoom(userId, roomName);
            return response.data;
        } catch (error) {
            console.error("Failed to create chat room:", error); // 오류 처리 추가
        }
    };

    const handleDeleteChatRoom = async (roomId) => {
        try {
            await deleteChatRoom(roomId);
            await fetchChatRooms();

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

    const fetchBotResponse = async (text, updateBotMessage) => {
        try {
            const response = await getChatResponse(text);
            const content = response.data.choices[0].message.content;
            updateBotMessage(content);
            console.log("content" + content);

        } catch (error) {
            console.error("Failed to fetch bot response:", error);
            updateBotMessage("응답을 받아오지 못했습니다.");
        }
    };

    const handleSendMessage = async (room, text) => {
        let roomId = room;
        let newRoom = null;

        console.log(messages);

        if (!activeRoom) {
            newRoom = await handleCreateChatRoom("New Chat Room");
            roomId = newRoom.chattingRoomId;
            setActiveRoom(roomId);
            navigate(`/ai-chat?room-id=${roomId}`);
            fetchMessages(roomId);
            console.log("newActiveRoom: " + messages);
        }


        if (!messages.length) {
            setMessages([]);
        }

        const newMessage = { id: messages.length ? messages.length + 1 : 0, text: text, sender: "user" };
        setMessages(prevMessages => [...prevMessages, newMessage]);

        // console.log("newMessage: "+ messages.length + messages);

        try {
            await saveMessage(roomId, text, "USER"); // 메시지 저장
        } catch (error) {
            console.error("Failed to save user message:", error); // 오류 처리 추가
        }

        const botMessage = { id: newMessage.id + 1, text: "답변을 입력 중입니다...", sender: "bot" };
        setMessages(prevMessages => [...prevMessages, botMessage]);

        // console.log("botMessage: " + messages.length +  messages);

        await fetchBotResponse(text, async (chunk) => {
            setMessages(prevMessages => prevMessages.map(msg =>
                msg.id === botMessage.id ? { ...msg, text: chunk } : msg
            ));
            try {
                await saveMessage(roomId, chunk, "BOT"); // 봇 메시지 저장
            } catch (error) {
                console.error("Failed to save bot message:", error); // 오류 처리 추가
            }
        });
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
                        messages={messages}
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