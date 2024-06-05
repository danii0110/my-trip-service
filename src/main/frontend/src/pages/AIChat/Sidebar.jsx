import React from 'react';
import styles from './Sidebar.module.scss';
import newChat from "../../assets/newChat.svg"
import sidebar from "../../assets/sidebar.svg"
import SidebarContent from "./SidebarContent";

const Sidebar = ({toggleSidebar, addNewChatRoom, chatRooms, activeRoom, setActiveRoom}) => {

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebarHeader}>
                <button className={styles.sidebarButton} onClick={toggleSidebar}><img src={sidebar} alt="sidebar"/> </button>
                <button className={styles.newChatButton} onClick={addNewChatRoom}><img src={newChat} alt="newChat" /></button>
            </div>
            <div className={styles.sidebarContent}>
                <SidebarContent chatRooms = {chatRooms} activeRoom = {activeRoom} setActiveRoom={setActiveRoom}/>
            </div>
        </div>
    );
};

export default Sidebar;

