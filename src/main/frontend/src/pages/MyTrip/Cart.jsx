import styles from './Cart.module.scss';
import QuestionIcon from '../../assets/questionIcon.svg';
import Plan from './Plan';
import { useState } from 'react';

const Cart = () => {
  const plansData = [
    { date: '24.04.25-24.04.28', areaName: '광주 동구', planNum: 1 },
    { date: '24.05.10-24.05.15', areaName: '서울 강남구', planNum: 2 },
    { date: '24.06.01-24.06.05', areaName: '부산 해운대구', planNum: 3 },
    { date: '24.07.20-24.07.25', areaName: '대구 중구', planNum: 4 },
    { date: '24.08.15-24.08.20', areaName: '인천 연수구', planNum: 5 },
    { date: '24.09.05-24.09.10', areaName: '제주 제주시', planNum: 6 },
    { date: '24.10.12-24.10.18', areaName: '광주 북구', planNum: 7 },
    { date: '24.11.22-24.11.27', areaName: '대전 유성구', planNum: 8 },
  ];

  const plans = plansData
    .slice(0, 8)
    .map((plan, index) => <Plan key={index} date={plan.date} areaName={plan.areaName} planNum={plan.planNum} />);

  return (
    <div className={styles.container}>
      <div className={styles.subtitleCont}>
        <div className={styles.subtitle}>나의 여행 도시 목록</div>
        <button className={styles.questionIcon}>
          <img src={QuestionIcon} alt='question-icon' />
          <div className={styles.tooltip}>
            AI 일정 최적화 전에 설정한 일자와 선택한 숙소, 장소들을 중간 저장해 놓은 목록입니다.
          </div>
        </button>
      </div>
      <div className={styles.mainCont}>
        <div className={styles.main}>{plans}</div>
      </div>
    </div>
  );
};
export default Cart;
