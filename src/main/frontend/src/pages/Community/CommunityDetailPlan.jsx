import Header from "../../components/layouts/Header";
import styles from "./CommunityDetailPlan.module.scss"
import Calendar from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {LuCalendar, LuMapPin} from 'react-icons/lu';
import {TiChevronLeft, TiChevronRight} from "react-icons/ti";
import React, {useEffect, useState} from "react";
import ScheduleItem from "./ScheduleItem";
import StepModal from "./StepModal";
import {useNavigate, useSearchParams, useLocation} from "react-router-dom";
import {getDailyScheduleByPlanId, getPlanById} from "./communityPlanApi";
import MapComponent from "./MapComponent";

const CommunityDetailPlan = () => {
    const [searchParams] = useSearchParams();
    const planId = searchParams.get("planId");

    const [planData, setPlanData] = useState(null);
    const [dailySchedules, setDailySchedules] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalStep, setModalStep] = useState(0);
    const [availableDates, setAvailableDates] = useState([]);
    const [schedules, setSchedules] = useState({});
    const [moveTimes, setMoveTimes] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            const planData = await getPlanById(planId);
            setPlanData(planData);
            setMoveTimes(planData.moveTimes);
            console.log(planData);

            const dailySchedulesData = await getDailyScheduleByPlanId(planId);
            setDailySchedules(dailySchedulesData);

            const startDate = new Date(planData.startDate[0], planData.startDate[1] -1, planData.startDate[2]);
            const endDate = new Date(planData.endDate[0], planData.endDate[1] -1, planData.endDate[2]);
            const dates = [];
            const currentSchedules = {};

            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                const dateKey = formatDateKey(d);
                dates.push(new Date(d));
                currentSchedules[dateKey] = { time: "", items: [] };
            }

            dailySchedulesData.forEach(schedule => {
                const dateKey = formatDateKey(new Date(schedule.date[0], schedule.date[1] - 1, schedule.date[2]));
                if (!currentSchedules[dateKey]) {
                    currentSchedules[dateKey] = { time: "", items: [] };
                }
                currentSchedules[dateKey].items.push(...schedule.schedulePlaces);
            });

            setAvailableDates(dates);
            setSchedules(currentSchedules);
            setSelectedDate(dates[0]);
        };

        fetchDetails();
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [planId]);

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

    const formattedDate = selectedDate ? formatDateKey(selectedDate) : "";
    const scheduleForSelectedDate = schedules[formattedDate]?.items || [];
    const scheduleTimeForSelectedDate = schedules[formattedDate]?.time || "";

    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <div>
            <button className={styles.calendarButton} onClick={onClick} ref={ref}>
                <LuCalendar size="30px"/> {value}
            </button>
        </div>
    ));

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

    if (!planData) {
        return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
    }

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.mapContainer}>
                    <MapComponent scheduleForSelectedDate={scheduleForSelectedDate} />
                </div>
                <div className={styles.info}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <h3>{planData?.title}</h3>
                        </div>
                        <div className={styles.dateLocation}>
                            <div className={styles.date}>
                                <LuCalendar size="25px"/>
                                <h3>기간</h3>
                                <p>{formatDateKey(new Date(planData.startDate[0], planData.startDate[1] - 1,
                                    planData.startDate[2]))} ~ {formatDateKey(new Date(planData.endDate[0], planData.endDate[1] - 1,
                                    planData.endDate[2]))}</p>
                            </div>
                            <div className={styles.location}>
                                <LuMapPin size="25px" />
                                <h3>장소</h3>
                                <p>{planData?.region}</p>
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
                                    style={{visibility: availableDates.findIndex(date => date.getTime()
                                            === selectedDate?.getTime()) === 0 ? 'hidden' : 'visible'}}
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
                                    style={{visibility: availableDates.findIndex(date => date.getTime()
                                            === selectedDate?.getTime()) === availableDates.length - 1 ? 'hidden' : 'visible'}}
                                >
                                    <TiChevronRight size="30px" color="gray"/>
                                </button>
                            </div>
                            <div className={styles.schedule}>
                                <h3>{scheduleTimeForSelectedDate}</h3>
                                {scheduleForSelectedDate.map((item, index) => (
                                    <ScheduleItem key={item.schedulePlaceId} index={index + 1} item={item}
                                                  transportation={planData.transportation} moveTimes={moveTimes || []}
                                    />
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
                    planData={planData}
                    dailySchedules={dailySchedules}
                />
            )}
        </div>
    );
}

export default CommunityDetailPlan;