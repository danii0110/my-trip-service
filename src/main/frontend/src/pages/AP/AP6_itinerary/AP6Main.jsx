import styles from './AP6Main.module.scss';
import KakakoMap from '../../../modules/api/KakaoMap/KakaoMap';
import PlanCont from './PlanCont';
import whiteUpArrowIcon from '../../../assets/whiteUpArrowIcon.svg';
import whiteDownArrowIcon from '../../../assets/whiteDownArrowIcon.svg';
import { useState, useEffect } from 'react';
import AIRouteModal from './AIRouteModal';
import { useLocation } from 'react-router-dom';
import regionMap from '../../../modules/utils/regionMap';
import axios from 'axios';

const AP6Main = () => {
  const location = useLocation();
  const { selectedDates, selectedRegion, selectedArea, tableData, selectedTransport, planId } = location.state || {};

  const [isUpArrow, setIsUpArrow] = useState(true);
  const [plans, setPlans] = useState([]); // 빈 배열로 초기화

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/plans/${planId}`);
        setPlans(response.data); // 받아온 데이터를 설정
      } catch (error) {
        console.error('Error fetching plans: ', error);
      }
    };

    if (planId) {
      fetchPlans();
    }
  }, [planId]);

  const handleClick = () => {
    setIsUpArrow(!isUpArrow);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `24.${month}.${day}`;
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
