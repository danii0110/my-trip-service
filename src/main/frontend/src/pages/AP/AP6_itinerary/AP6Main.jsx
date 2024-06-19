import styles from './AP6Main.module.scss';
import KakakoMap from '../../../modules/api/KakaoMap/KakaoMap';
import PlanCont from './PlanCont';
import whiteUpArrowIcon from '../../../assets/whiteUpArrowIcon.svg';
import whiteDownArrowIcon from '../../../assets/whiteDownArrowIcon.svg';
import { useState } from 'react';
import AIRouteModal from './AIRouteModal';
import { useLocation } from 'react-router-dom';

const AP6Main = () => {
  const location = useLocation();
  const { selectedDates, selectedRegion, selectedArea, tableData, selectedTransport } = location.state || {};

  const [isUpArrow, setIsUpArrow] = useState(true);

  const handleClick = () => {
    setIsUpArrow(!isUpArrow);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftCont}>
          <div className={styles.leftHeader}>
            <div className={styles.titleArea}>광주 동구</div>
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
              ? `${selectedDates.start} - ${selectedDates.end}`
              : '날짜를 선택하세요'}
          </div>
          {!isUpArrow && <AIRouteModal />}
          <PlanCont />
        </div>
        <div className={styles.rightCont}>
          <KakakoMap selectedRegion={selectedRegion} selectedArea={selectedArea} regionMap={{}} />
        </div>
      </div>
    </>
  );
};

export default AP6Main;
