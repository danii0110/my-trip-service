import React from 'react';
import styles from './Sidebar.module.scss';
import newChat from "../../assets/newChat.svg"
import sidebar from "../../assets/sidebar.svg"
import SidebarContent from "./SidebarContent";
import {useNavigate} from "react-router-dom";

const Sidebar = ({ toggleSidebar, handleDeleteChatRoom, handleRenameChatRoom, chatRooms, setActiveRoom }) => {
    const navigate = useNavigate();

    const handleNewChatButton = () => {
        setActiveRoom(null);
        navigate(`/ai-chat`);
    }


    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebarHeader}>
                <button className={styles.sidebarButton} onClick={toggleSidebar}><img src={sidebar} alt="sidebar" /></button>
                <button className={styles.newChatButton} onClick={handleNewChatButton}><img src={newChat} alt="newChat" /></button>
            </div>
            <div className={styles.sidebarContent}>
                <SidebarContent
                    chatRooms={chatRooms}
                    setActiveRoom={setActiveRoom}
                    handleDeleteChatRoom={handleDeleteChatRoom}
                    handleRenameChatRoom={handleRenameChatRoom}
                />
            </div>
        </div>
    );
};

export default Sidebar;

