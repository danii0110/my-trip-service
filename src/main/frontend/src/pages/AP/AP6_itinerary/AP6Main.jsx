import styles from './AP6Main.module.scss';
import KakakoMap from '../../../modules/api/KakaoMap/KakaoMap';
import PlanCont from './PlanCont';
import whiteUpArrowIcon from '../../../assets/whiteUpArrowIcon.svg';
import whiteDownArrowIcon from '../../../assets/whiteDownArrowIcon.svg';
import { useState, useEffect } from 'react';
import AIRouteModal from './AIRouteModal';
import { useLocation } from 'react-router-dom';
import regionMap from '../../../modules/utils/regionMap';

const AP6Main = () => {
  const location = useLocation();
  const { selectedDates, selectedRegion, selectedArea, tableData, selectedTransport } = location.state || {};

  const [isUpArrow, setIsUpArrow] = useState(true);
  const [plans, setPlans] = useState([]);

  // 날짜 형식 변환 함수
  const formatDate = (date) => {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `24.${month}.${day}`;
  };

  // 모의 데이터 설정
  useEffect(() => {
    const mockPlans = [
      {
        date: '2024-06-23',
        schedulePlaces: [
          {
            startTime: '09:00',
            endTime: '11:00',
            category: 'RESTAURANT',
            name: '가마솥손두부',
            moveTime: '30분',
          },
          {
            startTime: '11:30',
            endTime: '13:00',
            category: 'SHOPPING',
            name: '미추홀구 쇼핑몰',
          },
        ],
      },
      {
        date: '2024-06-24',
        schedulePlaces: [
          {
            startTime: '10:00',
            endTime: '12:00',
            category: 'ACCOMMODATION',
            name: '로지호텔',
            moveTime: '40분',
          },
          {
            startTime: '12:40',
            endTime: '14:00',
            category: 'CULTURAL_FACILITY',
            name: '미추홀구 박물관',
          },
        ],
      },
    ];
    setPlans(mockPlans);
  }, []);

  const handleClick = () => {
    setIsUpArrow(!isUpArrow);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftCont}>
          <div className={styles.leftHeader}>
            <div className={styles.titleArea}>
              {regionMap[selectedRegion]} {selectedArea}
            </div>
            <button className={styles.btnCommon} type='button' onClick={handleClick}>
              AI 루트 평가
              <img
                className={styles.arrowIcon}
                src={isUpArrow ? whiteUpArrowIcon : whiteDownArrowIcon}
                alt={isUpArrow ? 'up-arrow-icon' : 'down-arrow-icon'}
              />
            </button>
          </div>
          <div className={styles.showDate}>
            {selectedDates?.start && selectedDates?.end
              ? `${formatDate(selectedDates.start)} - ${formatDate(selectedDates.end)}`
              : '날짜를 선택하세요'}
          </div>
          {!isUpArrow && <AIRouteModal />}
          <PlanCont plans={plans} />
        </div>
        <div className={styles.rightCont}>
          <KakakoMap selectedRegion={selectedRegion} selectedArea={selectedArea} regionMap={regionMap} />
        </div>
      </div>
    </>
  );
};

export default AP6Main;
