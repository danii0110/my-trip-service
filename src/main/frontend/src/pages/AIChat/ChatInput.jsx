import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatInput.module.scss';

const ChatInput = ({ onSendMessage }) => {
    const textareaRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const [rows, setRows] = useState(1);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "50px";
            // textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
            // setRows(textareaRef.current.scrollHeight / 20);
        }
    };

    // useEffect(() => {
    //     adjustTextareaHeight(); // 컴포넌트가 로드될 때 한 번 실행하여 초기 높이 설정
    // }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== "") {
            e.preventDefault();
            handleSubmit();
            textareaRef.current.focus();
        }
    };

    const handleSubmit = () => {
        if (inputValue.trim() === "") return;
        onSendMessage(inputValue.trim());
        setInputValue("");
    };

    return (
        <div className={styles.inputContainer}>
            <textarea
                ref={textareaRef}
                placeholder="채팅을 입력하세요"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={rows}
            />
            <button onClick={handleSubmit}>Send</button>
            {/*<button onClick={() => onSendMessage(inputValue.trim())}>Send</button>*/}
        </div>
    );
};

export default ChatInput;

