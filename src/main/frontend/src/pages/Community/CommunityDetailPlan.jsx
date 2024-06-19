import Header from "../../components/layouts/Header";
import styles from "./CommunityDetailPlan.module.scss"
import Calendar from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {LuCalendar, LuMapPin} from 'react-icons/lu';
import {TiChevronLeft, TiChevronRight} from "react-icons/ti";
import React, {useState} from "react";
import ScheduleItem from "./ScheduleItem";
import StepModal from "./StepModal";

const availableDates = [
    new Date(2024, 3, 21),
    new Date(2024, 3, 22),
    new Date(2024, 3, 23)
];

const schedules = {
    "2024-04-21": {
        time: "9:00 ~ 22:00",
        items: [
            { id: 1, title: '장소명1', tag: '태그', address: '주소', time: '출발시간 ~ 도착시간', travelTime: '이동수단: 이동시간' },
            { id: 2, title: '장소명2', tag: '태그', address: '주소', time: '출발시간 ~ 도착시간', travelTime: '이동수단: 이동시간' }
        ]
    },
    "2024-04-22": {
        time: "10:00 ~ 21:00",
        items: [
            { id: 3, title: '인천대공원 반려견놀이터', tag: '태그', address: '인천 남동구', time: '출발시간 ~ 도착시간', travelTime: '이동수단: 이동시간' },
            { id: 4, title: '장소명4', tag: '관광지', address: '서울 용산구', time: '출발시간 ~ 도착시간', travelTime: '이동수단: 이동시간' }
        ]
    },
    "2024-04-23": {
        time: "8:00 ~ 22:00",
        items: [
            { id: 5, title: '장소명5', tag: '태그', address: '주소', time: '출발시간 ~ 도착시간', travelTime: '이동수단: 이동시간' },
            { id: 6, title: '장소명6', tag: '태그', address: '주소', time: '출발시간 ~ 도착시간', travelTime: '이동수단: 이동시간' }
        ]
    },
};

const CommunityDetailPlan = () => {
    const [selectedDate, setSelectedDate] = useState(availableDates[0]);
    const [modalStep, setModalStep] = useState(0);
    const currentIndex = availableDates.findIndex(date => date.getTime() === selectedDate.getTime());


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handlePrevDate = () => {
        const currentIndex = availableDates.findIndex(date => date.getTime() === selectedDate.getTime());
        if (currentIndex > 0) {
            setSelectedDate(availableDates[currentIndex - 1]);
        }
    };

    const handleNextDate = () => {
        const currentIndex = availableDates.findIndex(date => date.getTime() === selectedDate.getTime());
        if (currentIndex < availableDates.length - 1) {
            setSelectedDate(availableDates[currentIndex + 1]);
        }
    };

    const formatDateKey = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formattedDate = formatDateKey(selectedDate);
    const scheduleForSelectedDate = schedules[formattedDate]?.items || [];
    const scheduleTimeForSelectedDate = schedules[formattedDate]?.time || "";

    const CustomInput = ({ value, onClick }) => (
        <div>
            <button className={styles.calendarButton} onClick={onClick}>
                <LuCalendar size="30px"/> {value}
            </button>
        </div>

    );

    const handleNextModal = () => {
        setModalStep(modalStep + 1);
        if (modalStep === 3) {
            setModalStep(0);
        }
    };

    const handlePrevModal = () => {
        setModalStep(modalStep - 1);
    };

    const handleCloseModal = () => {
        setModalStep(0);
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.map}>
                    <p>50%, flex, kakao</p>
                </div>
                <div className={styles.info}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <h3>제목</h3>
                        </div>
                        <div className={styles.dateLocation}>
                            <div className={styles.date}>
                                <LuCalendar size="25px"/>
                                <h3>기간</h3>
                                <p>기간(몇박 몇일 인지)</p>
                            </div>
                            <div className={styles.location}>
                                <LuMapPin size="25px" />
                                <h3>장소</h3>
                                <p> 지역명 + 시, 도명</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.plan}>
                        <div className={styles.planHeader}>
                            <h3>여행 계획</h3>
                            <button onClick={() => setModalStep(1)}>나의 코스로 담기</button>
                        </div>
                        <div className={styles.detailPlan}>
                            <div className={styles.datePicker}>
                                <button
                                    onClick={handlePrevDate}
                                    style={{visibility: currentIndex === 0 ? 'hidden' : 'visible'}}
                                >
                                    <TiChevronLeft size="30px" color="gray"/>
                                </button>
                                <Calendar
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="yy/MM/dd"
                                    includeDates={availableDates}
                                    customInput={<CustomInput/>}
                                />
                                <button
                                    onClick={handleNextDate}
                                    style={{visibility: currentIndex === availableDates.length - 1 ? 'hidden' : 'visible'}}
                                >
                                    <TiChevronRight size="30px" color="gray"/>
                                </button>
                            </div>
                            <div className={styles.schedule}>
                                <h3>{scheduleTimeForSelectedDate}</h3>
                                {scheduleForSelectedDate.map((item, index) => (
                                    <ScheduleItem key={item.id} index={index + 1} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modalStep > 0 && (
                <StepModal
                    step={modalStep}
                    onNext={handleNextModal}
                    onPrev={handlePrevModal}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default CommunityDetailPlan;