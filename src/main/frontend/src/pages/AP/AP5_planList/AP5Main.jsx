import styles from './AP5Main.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionIcon from '../../../assets/questionIcon.svg';
import UpArrowIcon from '../../../assets/upArrowIcon.svg';
import DownArrowIcon from '../../../assets/downArrowIcon.svg';
import KakakoMap from '../../../modules/api/KakaoMap/KakaoMap';
import { useState } from 'react';
import PlanCont from './PlanCont';
import CartModal from './CartModal';

const AP5Main = () => {
  const [isUpArrow, setIsUpArrow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContents, setModalContents] = useState([
    {
      editDate: '24.04.20',
      duration: '24.04.25-24.04.29',
      places: ['광주 동구 1'],
      placeCount: 1,
    },
    {
      editDate: '24.04.21',
      duration: '24.04.26-24.04.30',
      places: ['광주 동구 2'],
      placeCount: 2,
    },
    {
      editDate: '24.04.22',
      duration: '24.04.27-24.05.01',
      places: ['광주 동구 3'],
      placeCount: 3,
    },
    {
      editDate: '24.04.23수정',
      duration: '24.04.28-24.05.02',
      places: ['광주 동구 4'],
      placeCount: 4,
    },
  ]);

  const handleClick = () => {
    setShowModal(!showModal);
    setIsUpArrow(!isUpArrow);
  };

  const removeModal = (index) => {
    setModalContents((prevContents) => prevContents.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftCont}>
          <div className={styles.cart}>
            <div className={styles.title}>나의 광주 동구 여행 장바구니</div>
            <button className={styles.questionIcon}>
              <img src={QuestionIcon} alt='question-icon' />
              <div className={styles.tooltip}>
                AI 일정 최적화 전에 설정한 일자와 선택한 숙소, 장소들을 중간 저장해 놓은 목록입니다.
              </div>
            </button>
            <button onClick={handleClick}>
              <img
                className={styles.arrowIcon}
                src={isUpArrow ? UpArrowIcon : DownArrowIcon}
                alt={isUpArrow ? 'up-arrow-icon' : 'down-arrow-icon'}
              />
            </button>
          </div>
          {showModal && (
            <div className={styles.modalContainer}>
              {modalContents.slice(0, 4).map((content, index) => (
                <CartModal key={index} content={content} onRemove={() => removeModal(index)} />
              ))}
            </div>
          )}
          <div className={styles.planCont}>
            <PlanCont />
          </div>
        </div>
        <div className={styles.rightCont}>
          <KakakoMap />
        </div>
      </div>
    </>
  );
};

export default AP5Main;
