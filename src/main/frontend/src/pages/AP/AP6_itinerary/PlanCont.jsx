import styles from './PlanCont.module.scss';
import DayCont from './DayCont';
import { useState } from 'react';
import GoMyTripModal from './GoMyTripModal';

const PlanCont = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const days = [
    {
      day: '1일차',
      date: '24.04.25',
      plans: [
        { time: '9:00-10:00', tag: '명소', place: '성산 일출봉', moveTime: '100분' },
        { time: '10:00-11:00', tag: '식사', place: '현지 맛집', moveTime: '30분' },
        { time: '11:00-12:00', tag: '쇼핑', place: '현지 마켓', moveTime: '20분' },
        { time: '12:00-13:00', tag: '명소', place: '박물관', moveTime: '40분' },
        { time: '13:00-14:00', tag: '식사', place: '레스토랑', moveTime: '15분' },
        { time: '14:00-15:00', tag: '명소', place: '테마파크', moveTime: '' },
      ],
    },
    {
      day: '2일차',
      date: '24.04.26',
      plans: [
        { time: '9:00-10:00', tag: '명소', place: '박물관', moveTime: '40분' },
        { time: '10:00-11:00', tag: '식사', place: '레스토랑', moveTime: '15분' },
        { time: '11:00-12:00', tag: '명소', place: '테마파크', moveTime: '50분' },
        { time: '12:00-13:00', tag: '쇼핑', place: '쇼핑몰', moveTime: '20분' },
        { time: '13:00-14:00', tag: '명소', place: '공원', moveTime: '' },
      ],
    },
    {
      day: '3일차',
      date: '24.04.27',
      plans: [
        { time: '9:00-10:00', tag: '명소', place: '유명 사원', moveTime: '60분' },
        { time: '10:00-11:00', tag: '명소', place: '해변', moveTime: '40분' },
        { time: '11:00-12:00', tag: '식사', place: '해변 레스토랑', moveTime: '30분' },
        { time: '12:00-13:00', tag: '명소', place: '공원', moveTime: '20분' },
        { time: '13:00-14:00', tag: '쇼핑', place: '시장', moveTime: '50분' },
        { time: '14:00-15:00', tag: '명소', place: '미술관', moveTime: '30분' },
        { time: '15:00-16:00', tag: '식사', place: '카페', moveTime: '' },
      ],
    },
    {
      day: '4일차',
      date: '24.04.28',
      plans: [
        { time: '9:00-10:00', tag: '명소', place: '아트 갤러리', moveTime: '20분' },
        { time: '10:00-11:00', tag: '식사', place: '현지 카페', moveTime: '30분' },
        { time: '11:00-12:00', tag: '명소', place: '성', moveTime: '50분' },
        { time: '12:00-13:00', tag: '숙박', place: '리조트', moveTime: '40분' },
        { time: '13:00-14:00', tag: '쇼핑', place: '현지 시장', moveTime: '30분' },
        { time: '14:00-15:00', tag: '명소', place: '해변', moveTime: '20분' },
        { time: '15:00-16:00', tag: '식사', place: '해변 레스토랑', moveTime: '10분' },
        { time: '16:00-17:00', tag: '명소', place: '박물관', moveTime: '' },
      ],
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainCont}>
          {days.map((dayInfo, index) => (
            <DayCont key={index} day={dayInfo.day} date={dayInfo.date} plans={dayInfo.plans} />
          ))}
        </div>
        <button className={styles.makePlanBtn} type='button' onClick={handleButtonClick}>
          저장
        </button>
      </div>
      <GoMyTripModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};

export default PlanCont;
