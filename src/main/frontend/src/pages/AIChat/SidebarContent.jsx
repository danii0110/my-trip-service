import styles from "./SidebarContent.module.scss"
import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const SidebarContent = ({ chatRooms, activeRoom, setActiveRoom, handleDeleteChatRoom, handleRenameChatRoom }) => {
    const [dropdownVisible, setDropDownVisible] = useState(null);
    const [editRoomId, setEditRoomId] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null);
    const [modalType, setModalType] = useState('');
    const navigate = useNavigate();
    const modalRef = useRef(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const roomId = queryParams.get("room-id");

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.target.closest(`.${styles.dropdownMenu}`) === null &&
                e.target.closest(`.${styles.optionsButton}`) === null) {
                setDropDownVisible(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // useEffect(() => {
    //     console.log(`Active room changed to: ${activeRoom}`);
    // }, [activeRoom]);

    const handleRoomClick = (room) => {
        const activeRoomDetails = chatRooms.find(room => room.chattingRoomId === Number(roomId));
        setActiveRoom(activeRoomDetails);
        setDropDownVisible(null);
        navigate(`/ai-chat?room-id=${room.chattingRoomId}`);
        // console.log("active" + activeRoom);
    };

    const handleOptionsClick = (room) => {
        if (dropdownVisible === room) {
            setDropDownVisible(null);
        } else {
            setDropDownVisible(room);
        }
    };

    const handleEdit = (room) => {
        setDropDownVisible(null);
        setEditRoomId(room.chattingRoomId);
        setNewTitle(room.chattingTitle);
        setModalType('edit');
        setShowModal(true);
    };

    const handleSave = (roomId) => {
        handleRenameChatRoom(editRoomId, newTitle);
        setShowModal(false);
        setEditRoomId(null);
        setNewTitle('');

    };

    const handleDelete = (roomId) => {
        setDropDownVisible(null);
        setRoomToDelete(roomId);
        setModalType('delete');
        setShowModal(true);
    };

    const confirmDelete = () => {
        handleDeleteChatRoom(roomToDelete);
        setShowModal(false);
        setRoomToDelete(null);
    };

    const cancelAction = () => {
        setShowModal(false);
        setEditRoomId(null);
        setRoomToDelete(null);
        setNewTitle('');
    };


    const renderChatRooms = (rooms) => {
        if (rooms.length === 0) {
            return <p className={styles.noRooms}>채팅방을 생성하세요.</p>; // 비어있는 경우 메시지 표시
        }

        return rooms.map((room, index) => (
            <div key={index}
                 className={`${styles.chatRoomButtonContainer} ${(activeRoom && activeRoom.chattingRoomId) === room.chattingRoomId ? styles.active : ''}`}>
                <button
                    className={styles.chatRoomButton}
                    onClick={() => handleRoomClick(room)}
                >
                    {room.chattingTitle}
                </button>
                <button
                    id={index}
                    className={styles.optionsButton}
                    onClick={() => handleOptionsClick(room)}
                >
                    {/*⋮*/}
                    ...
                </button>
                {dropdownVisible === room && (
                    <div className={styles.dropdownMenu}>
                        <button onClick={() => handleEdit(room)}>수정</button>
                        <button onClick={() => handleDelete(room.chattingRoomId)}>삭제</button>
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div>
            {renderChatRooms(chatRooms)}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent} ref={modalRef}>
                        {modalType === 'edit' ? (
                            <>
                                <div className={styles.modalHeader}>
                                    <h2>채팅방 제목 변경</h2>
                                </div>
                                <div className={styles.modal}>
                                    <input
                                        id = "changeTitle"
                                        type="text"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                    />
                                    <div className={styles.modalButton}>
                                        <button onClick={handleSave}>확인</button>
                                        <button onClick={cancelAction}>취소</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.modalHeader}>
                                    <h2>채팅방 삭제</h2>
                                </div>
                                <div className={styles.modal}>
                                    <p>정말 채팅방을 삭제하시겠습니까?</p>
                                    <div className={styles.modalButton}>
                                        <button onClick={confirmDelete}>확인</button>
                                        <button onClick={cancelAction}>취소</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SidebarContent;