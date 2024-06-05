import styles from './AIChatPage.module.scss';
import Header from "../../components/layouts/Header";
import React, {useEffect, useState} from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const AIChatPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const roomId = queryParams.get("room-id");

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeRoom, setActiveRoom] = useState(roomId || "Welcome");
    const [tempRoom, setTempRoom] = useState(null);

    const [chatRooms, setChatRooms] = useState({
        today: ["Chat Room 1", "Chat Room 2"],
        yesterday: ["Chat Room 3"],
        last7Days: ["Chat Room 4", "Chat Room 5"],
        last30Days: ["Chat Room 6"],
        older: ["Chat Room 7"]
    });

    const [messages, setMessages] = useState({
        "Chat Room 1": [],
        "Chat Room 2": [],
        "Chat Room 3": [],
        "Chat Room 4": [],
        "Chat Room 5": [],
        "Chat Room 6": [],
        "Chat Room 7": []
    });

    useEffect(() => {
        if (roomId) {
            setActiveRoom(roomId);
        }
    }, [roomId]);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    }

    const addNewChatRoom = () => {
        navigate("/ai-chat"); // 시작 페이지로 이동
        setActiveRoom("Welcome");
        console.log(activeRoom);
    }

    const handleSendMessage = (room, text) => {
        const newMessage = {id: messages[room]?.length ? messages[room].length + 1 : 1, text: text, sender: "user"};
        setMessages(prevMessages => ({
            ...prevMessages,
            [room]: [...(prevMessages[room] || []), newMessage]
        }));

        if (activeRoom === "Welcome") {
            setChatRooms(prevChatRooms => ({
                ...prevChatRooms,
                today: [...prevChatRooms.today, room]
            }));
            setActiveRoom(room);
        }

        setTimeout(() => {
            const botMessage = {id: newMessage.id + 1, text: "Bot response", sender: "bot"};
            setMessages(prevMessages => ({
                ...prevMessages,
                [room]: [...prevMessages[room], botMessage]
            }));
        }, 1000);

    }

    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.aiChat}>
                {isSidebarOpen &&
                    <Sidebar
                        toggleSidebar={toggleSidebar}
                        addNewChatRoom={addNewChatRoom}
                        chatRooms={chatRooms}
                        activeRoom={activeRoom}
                        setActiveRoom={setActiveRoom}
                    />
                }
                <div className={`${styles.chat} ${!isSidebarOpen ? styles.fullWidthChat : ''}`}>
                    <Chat
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        activeRoom={activeRoom || tempRoom}
                        toggleSidebar={toggleSidebar}
                        addNewChatRoom={addNewChatRoom}
                        isSidebarOpen={isSidebarOpen}
                    />
                </div>
            </div>
        </div>

    );
};
export default AIChatPage;