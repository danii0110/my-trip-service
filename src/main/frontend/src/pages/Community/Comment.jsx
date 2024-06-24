import styles from "./Comment.module.scss";
import React, {useEffect, useRef, useState} from "react";
import {formatDateTime} from "../../modules/utils/util";

const Comment = ({id, comment, nickname, date, activeDropdown, handleDropdown, onUpdate, onDelete}) => {
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment);

    const handleButtonClick = (e) => {
        e.stopPropagation();
        handleDropdown(id);
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(id);
    };

    const handleSaveClick = (e) => {
        e.stopPropagation();
        onUpdate(id, editedComment);
        setIsEditing(false);
    };

    const handleCancelClick = (e) => {
        e.stopPropagation();
        setEditedComment(comment);
        setIsEditing(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                (dropdownRef.current && !dropdownRef.current.contains(e.target)) &&
                (buttonRef.current && !buttonRef.current.contains(e.target))
            ) {
                handleDropdown(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.comment}>
            <div className={styles.commentDetail}>
                {isEditing ? (
                    <textarea
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                    />
                ) : (
                    <>
                        <h3>{comment}</h3>
                        <p>{nickname} | {formatDateTime(date)}</p>
                    </>
                )}
            </div>
            <div className={styles.commentButton} ref={buttonRef}>
                <button onClick={handleButtonClick} className={styles.optionsButton}>⋮</button>
            </div>
            {activeDropdown === id && (
                <div className={styles.dropdownMenu} ref={dropdownRef}>
                    {isEditing ? (
                        <>
                            <button onClick={handleSaveClick}>Save</button>
                            <button onClick={handleCancelClick}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleEditClick}>Edit</button>
                            <button onClick={handleDeleteClick}>Delete</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Comment;
