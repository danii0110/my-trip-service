import React, { useEffect, useRef} from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import styles from './Chat.module.scss';
import sidebar from "../../assets/sidebar.svg";
import newChat from "../../assets/newChat.svg";
import {useNavigate} from "react-router-dom";
import {createChatRoom} from "./chatApi";

const Chat = ({roomId, messages, onSendMessage, activeRoom, setActiveRoom, toggleSidebar, isSidebarOpen}) => {
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
    const userId = 1;

    const handleNewChatButton = () => {
        setActiveRoom(null);
        navigate(`/ai-chat`);
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
        console.log("chat useEffect");
        console.log(messages);
    }, [messages]);

    const handleSendMessage = async (text) => {
        onSendMessage(roomId, text);
    };

    const Welcome = () => {
        return (
            <div className={styles.welcome}>
                <div className={styles.welcomeMessage}>
                    <p>여행플래너에 오신 것을 환영합니다.</p>
                    <p>원하시는 장소를 기간과 함께 알려주시면 여행 일정을 만들어드립니다.</p>
                    <p>(최대 5일까지의 국내 여행 일정만 가능합니다.)</p>
                    <p>ex) 전주 3박 4일 여행일정을 만들어줘</p>
                </div>
                <div className={styles.welcomeButton}>
                    <button>여행지 둘러보기</button>
                    <button onClick={handleNewChatButton}>AI 플래너로 이동하기</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeaderContainer}>
                <div className={styles.chatHeader}>
                    {!isSidebarOpen &&
                        <div className={styles.sidebarHeader}>
                            <button className={styles.sidebarButton} onClick={toggleSidebar}><img src={sidebar}
                                                                                                  alt="sidebar"/>
                            </button>
                            <button className={styles.newChatButton} onClick={handleNewChatButton}><img src={newChat}
                                                                                                        alt="newChat"/>
                            </button>
                        </div>
                    }
                    <span>{activeRoom ? activeRoom.chattingTitle : 'Welcome'}</span>
                </div>
            </div>
            <div className={styles.messageContainer}>
                { !roomId ? (
                    <Welcome />
                ) : (
                    <div>
                        {messages.map((message, index) => (
                            <Message key={index} message={message}/>
                        ))}
                        <div ref={messagesEndRef}/>
                    </div>
                )}
            </div>
            <div className={styles.inputContainer}>
                {/* 채팅 입력 창 */}
                <ChatInput onSendMessage={handleSendMessage}/>
            </div>
        </div>
    );
};

export default Chat;
