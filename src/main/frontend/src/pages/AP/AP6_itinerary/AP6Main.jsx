import styles from './AP6Main.module.scss';
import KakakoMap from '../../../modules/api/KakaoMap/KakaoMap';
import PlanCont from './PlanCont';
import whiteUpArrowIcon from '../../../assets/whiteUpArrowIcon.svg';
import whiteDownArrowIcon from '../../../assets/whiteDownArrowIcon.svg';
import { useState } from 'react';
import AIRouteModal from './AIRouteModal';

const AP6Main = () => {
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
          <div className={styles.showDate}>24.04.25(목) - 24.04.29(월)</div>
          {!isUpArrow && <AIRouteModal />}
          <PlanCont />
        </div>
        <div className={styles.rightCont}>
          <KakakoMap />
        </div>
      </div>
    </>
  );
};
export default AP6Main;
