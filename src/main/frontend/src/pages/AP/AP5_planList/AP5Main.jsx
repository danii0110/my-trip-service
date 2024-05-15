import styles from './AP5Main.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';
import QuestionIcon from '../../../assets/questionIcon.svg';
import UpArrowIcon from '../../../assets/upArrowIcon.svg';
import DownArrowIcon from '../../../assets/downArrowIcon.svg';
import KakakoMap from '../../../modules/api/KakaoMap/KakaoMap';
import { useState } from 'react';
import PlanCont from './PlanCont';

const AP5Main = () => {
  const [isUpArrow, setIsUpArrow] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setIsUpArrow(!isUpArrow);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftCont}>
          <div className={styles.cart}>
            <div className={styles.title}>나의 광주 동구 여행 장바구니</div>
            <img className={styles.questionIcon} src={QuestionIcon} alt='question-icon' />
            <button onClick={handleClick}>
              <img
                className={styles.arrowIcon}
                src={isUpArrow ? UpArrowIcon : DownArrowIcon}
                alt={isUpArrow ? 'up-arrow-icon' : 'down-arrow-icon'}
              />
            </button>
          </div>
          <PlanCont />
        </div>
        <div className={styles.rightCont}>
          <KakakoMap />
        </div>
      </div>
    </>
  );
};
export default AP5Main;
