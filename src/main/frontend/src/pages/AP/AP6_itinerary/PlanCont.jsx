import styles from './PlanCont.module.scss';
import DayCont from './DayCont';
import { useState, useEffect } from 'react';
import GoMyTripModal from './GoMyTripModal';

const PlanCont = ({ plans }) => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    console.log('Plans in PlanCont:', plans); // 데이터 확인용 로그
  }, [plans]);

  if (!plans || !plans.dailySchedules || plans.dailySchedules.length === 0) {
    return <div className={styles.noPlans}>No plans available</div>;
  }

  const days = plans.dailySchedules.map((schedule, index) => {
    const day = `${index + 1}일차`;
    const dateArray = schedule.date;
    const date = `${dateArray[0]}.${dateArray[1]}.${dateArray[2]}`;
    const dayPlans = schedule.schedulePlaces.map((place, idx) => {
      const startTime = place.startTime
        ? `${place.startTime[0].toString().padStart(2, '0')}:${place.startTime[1].toString().padStart(2, '0')}`
        : '09:00';
      const endTime = place.endTime
        ? `${place.endTime[0].toString().padStart(2, '0')}:${place.endTime[1].toString().padStart(2, '0')}`
        : '10:00';
      const moveTime = place.moveTime || '';
      return {
        time: `${startTime} - ${endTime}`,
        tag: place.place.category,
        place: place.place.name,
        moveTime: moveTime,
        image: place.place.image,
      };
    });

    return { day, date, plans: dayPlans };
  });

  return (
    <div className={styles.container}>
      <div className={styles.mainCont}>
        {days.map((dayInfo, index) => (
          <DayCont key={index} day={dayInfo.day} date={dayInfo.date} plans={dayInfo.plans} />
        ))}
      </div>
      <button className={styles.makePlanBtn} type='button' onClick={handleButtonClick}>
        저장
      </button>
      <GoMyTripModal show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default PlanCont;
