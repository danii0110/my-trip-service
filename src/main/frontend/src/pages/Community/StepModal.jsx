import React, { useState } from 'react';
import CommunityModal from './CommunityModal';
import Calendar from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {LuCalendar} from "react-icons/lu";
import styles from "./StepModal.module.scss"

const StepModal = ({ step, onNext, onPrev, onClose }) => {
    const [courseName, setCourseName] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showWarning, setShowWarning] = useState(false);

    const CustomInput = ({ value, onClick }) => (
        <div className={styles.calendar}>
            <button className={styles.calendarButton} onClick={onClick}>
                <LuCalendar size="30px"/> {value}
            </button>
        </div>

    );

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleNextStep = () => {
        if (step === 1 && courseName.trim() === "") {
            setShowWarning(true);
        }
        else if (step === 2 && (!startDate || !endDate)) {
            setShowWarning(true);
        }
        else {
            setShowWarning(false);
            onNext();
        }
    };

    const renderContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>코스만들기</h2>
                        </div>
                        <div className={`${styles.modalContent} ${showWarning ? styles['warning-visible'] : ''}`}>
                            <input
                                type="text"
                                placeholder="코스명을 입력해 주세요."
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                            <div className={styles.modalButton}>
                                <button onClick={handleNextStep}>확인</button>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>기간 선택하기</h2>
                        </div>
                        <div className={`${styles.modalContent} ${showWarning ? styles['warning-visible'] : ''}`}>
                            <div className={styles.customDatePickerWidth}>
                                <Calendar
                                    selected={endDate}
                                    onChange={handleDateChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    isClearable
                                    maxDate={startDate ? new Date(startDate.getTime() + 4 * 24 * 60 * 60 * 1000) : null}
                                    dateFormat="yyyy/MM/dd"
                                    customInput={<CustomInput/>}
                                />
                            </div>
                            <div className={styles.modalButton}>
                                <button onClick={onPrev}>이전</button>
                                <button onClick={handleNextStep}>확인</button>
                            </div>
                        </div>

                    </div>
                );
            case 3:
                return (
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>알림</h2>
                        </div>
                        <div className={styles.modalContent}>
                            <p>코스 생성 및 코스 담기가 완료되었습니다.</p>
                            <div className={styles.modalButton}>
                                <button onClick={onPrev}>이전</button>
                                <button onClick={() => { /* MyTrip으로 이동 로직 추가 */}}>
                                    MyTrip 이동
                                </button>
                                <button onClick={onNext}>확인</button>
                            </div>
                        </div>


                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <CommunityModal onClose={onClose}>
            {renderContent()}
        </CommunityModal>
    );
};

export default StepModal;
