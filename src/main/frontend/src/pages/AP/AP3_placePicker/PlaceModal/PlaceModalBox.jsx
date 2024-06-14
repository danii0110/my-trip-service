import styles from './PlaceModalBox.module.scss';
import { Button } from 'react-bootstrap';
import LeftArrowIcon from '../../../../assets/leftArrow.svg';
import RightArrowIcon from '../../../../assets/rightArrow.svg';
import { useState } from 'react';
import PlaceModal from './PlaceModal';

const PlaceModalBox = ({ selectedDates }) => {
  // selectedDates prop 추가
  const [isLeftArrow, setIsLeftArrow] = useState(true);
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setIsLeftArrow(!isLeftArrow);
    setModal(!modal);
  };

  return (
    <div className={styles.container}>
      {modal && <PlaceModal selectedDates={selectedDates} />} {/* 조건부 렌더링 수정 */}
      <Button className={styles.modalBtn} onClick={handleClick}>
        <img
          className={styles.arrowIcon}
          src={isLeftArrow ? LeftArrowIcon : RightArrowIcon}
          alt={isLeftArrow ? 'left-arrow-icon' : 'right-arrow-icon'}
        />
      </Button>
    </div>
  );
};

export default PlaceModalBox;
