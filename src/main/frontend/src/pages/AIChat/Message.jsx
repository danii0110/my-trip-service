import React from 'react';
import styles from './Message.module.scss';

const Message = ({message}) => {
    const messageClass = message.sender === 'bot' ? styles.bot: styles.user;
    return (
        <div className={`${styles.message} ${messageClass}`}>
            <p>{message.text}</p>
        </div>
    );
};

export default Message;

