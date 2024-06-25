import styles from './AP6Main.module.scss';
import KakakoMap from '../../../modules/api/KakaoMap/KakaoMap';
import PlanCont from './PlanCont';
import whiteUpArrowIcon from '../../../assets/whiteUpArrowIcon.svg';
import whiteDownArrowIcon from '../../../assets/whiteDownArrowIcon.svg';
import { useState, useEffect } from 'react';
import AIRouteModal from './AIRouteModal';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import regionMap from '../../../modules/utils/regionMap';

const AP6Main = () => {
  const location = useLocation();
  const { selectedDates, selectedRegion, selectedArea, tableData, selectedTransport, planId } = location.state || {};

  const [isUpArrow, setIsUpArrow] = useState(true);
  const [plans, setPlans] = useState([]);

  // 날짜 형식을 변경하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const weekDay = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    return `${year}.${month}.${day}(${weekDay})`;
  };

  // 데이터 가져오기
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/plans/${planId}`);
        console.log('Fetched plans: ', response.data); // 데이터 확인용 로그
        const updatedPlans = calculateMoveTimes(response.data);
        setPlans(updatedPlans);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, [planId]);

  const calculateMoveTimes = (data) => {
    // 각 schedulePlaces 사이의 moveTime을 계산하여 추가
    data.dailySchedules.forEach((schedule) => {
      for (let i = 0; i < schedule.schedulePlaces.length - 1; i++) {
        const currentPlace = schedule.schedulePlaces[i];
        const nextPlace = schedule.schedulePlaces[i + 1];
        const moveTime = calculateMoveTime(currentPlace.endTime, nextPlace.startTime);
        currentPlace.moveTime = moveTime;
      }
    });
    return data;
  };

  const calculateMoveTime = (endTime, startTime) => {
    const endMinutes = endTime[0] * 60 + endTime[1];
    const startMinutes = startTime[0] * 60 + startTime[1];
    const moveMinutes = startMinutes - endMinutes;
    return `${moveMinutes}분`;
  };

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
          {!isUpArrow && <AIRouteModal planId={planId} />}
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
