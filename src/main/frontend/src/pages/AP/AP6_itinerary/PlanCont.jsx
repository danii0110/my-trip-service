import styles from './PlanCont.module.scss';
import DayCont from './DayCont';
import { useState, useEffect } from 'react';
import GoMyTripModal from './GoMyTripModal';

const PlanCont = ({ plans }) => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const addMinutes = (time, minsToAdd) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + minsToAdd);

    const newHours = date.getHours().toString().padStart(2, '0');
    const newMinutes = date.getMinutes().toString().padStart(2, '0');
    return `${newHours}:${newMinutes}`;
  };

  useEffect(() => {
    console.log('Plans in PlanCont:', plans); // 데이터 확인용 로그
  }, [plans]);

  if (!Array.isArray(plans) || plans.length === 0) {
    return <div className={styles.noPlans}>No plans available</div>;
  }

  const days = plans.map((plan, index) => {
    const day = `${index + 1}일차`;
    const date = plan.date;
    const dayPlans = plan.schedulePlaces.map((place, idx) => {
      const startTime = place.startTime || '09:00'; // startTime 기본값 설정
      const duration = place.duration || 60; // 모의 데이터에 duration 값이 없을 경우 60분으로 설정
      const endTime = place.endTime || addMinutes(startTime, duration);
      const moveTime = idx !== plan.schedulePlaces.length - 1 ? place.moveTime : '';
      return {
        time: `${startTime} - ${endTime}`,
        tag: place.category,
        place: place.name,
        moveTime: moveTime,
        image: place.image, // 이미지 추가
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
