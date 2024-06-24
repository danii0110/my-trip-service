import React, {useEffect, useState} from 'react';
import CommunityModal from './CommunityModal';
import Calendar from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {LuCalendar} from "react-icons/lu";
import styles from "./StepModal.module.scss"
import axios from "axios";
import {useNavigate} from "react-router-dom";

const StepModal = ({ step, onNext, onPrev, onClose, planData, dailySchedules }) => {
    const [courseName, setCourseName] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const [daysBetween, setDaysBetween] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (dailySchedules.length > 0) {
            const start = new Date(dailySchedules[0].date[0], dailySchedules[0].date[1] - 1, dailySchedules[0].date[2]);
            const end = new Date(dailySchedules[dailySchedules.length - 1].date[0], dailySchedules[dailySchedules.length - 1].date[1] - 1, dailySchedules[dailySchedules.length - 1].date[2]);
            const daysDiff = Math.floor((end - start) / (1000 * 60 * 60 * 24));
            setDaysBetween(daysDiff);
        }
    }, [dailySchedules]);

    const CustomInput = ({ value, onClick }) => (
        <div className={styles.calendar}>
            <button className={styles.calendarButton} onClick={onClick}>
                <LuCalendar size="30px"/> {value}
            </button>
        </div>
    );

    const savePlanner = async () => {
        try {
            // Plan 저장
            const planResponse = await axios.post('http://localhost:8080/api/plans', {
                userId: 1,  // 사용자의 ID를 실제로 사용해야 합니다.
                title: courseName,
                startDate: [startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()],
                endDate: [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()],
                planType: 'CART',
                region: planData.region,
            });

            const newPlanId = planResponse.data.planId;

            // Daily Schedules 및 Schedule Places 저장
            const newSchedules = generateNewSchedules(startDate, endDate, dailySchedules);
            for (const schedule of newSchedules) {
                const dailyScheduleDTO = {
                    planId: newPlanId,
                    date: [schedule.date.getFullYear(), schedule.date.getMonth() + 1, schedule.date.getDate()],
                    schedulePlaces: schedule.schedulePlaces.map(place => ({
                        placeId: place.place.placeId,
                        duration: place.duration,
                        startTime: place.startTime,
                        endTime: place.endTime
                    }))
                };

                await axios.post('http://localhost:8080/api/daily-schedules', dailyScheduleDTO);
            }
        } catch (error) {
            console.error('Failed to save planner:', error);
        }
    };

    const handleDateChange = (date) => {
        if (date) {
            if (!(date instanceof Date)) {
                date = new Date(date);
            }
            setStartDate(date);
            setEndDate(new Date(date.getTime() + daysBetween * 24 * 60 * 60 * 1000));
        } else {
            setStartDate(new Date(null));  // 초기화 시 null로 설정
            setEndDate(null);
        }
    };

    const handleNextStep = async () => {
        if (step === 1 && courseName.trim() === "") {
            setShowWarning(true);
        } else if (step === 2 && (!startDate || !endDate)) {
            setShowWarning(true);
        } else {
            setShowWarning(false);
            if (step === 2) {
                await savePlanner();
            }
            onNext();
        }
    };

    const generateNewSchedules = (startDate, endDate, dailySchedules) => {
        const daysBetween = (endDate - startDate) / (1000 * 60 * 60 * 24);
        const newSchedules = [];
        for (let i = 0; i <= daysBetween; i++) {
            const newDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
            const oldSchedule = dailySchedules[i % dailySchedules.length];
            newSchedules.push({
                date: newDate,
                schedulePlaces: oldSchedule.schedulePlaces,
            });
        }
        return newSchedules;
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
                                    selected={startDate}
                                    onChange={handleDateChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
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
                                <button onClick={() => navigate('/my-trip')}>
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
