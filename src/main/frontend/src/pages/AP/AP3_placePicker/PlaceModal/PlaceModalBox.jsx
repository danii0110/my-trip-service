import styles from './PlaceModalBox.module.scss';
import { Button } from 'react-bootstrap';
import LeftArrowIcon from '../../../../assets/leftArrow.svg';
import RightArrowIcon from '../../../../assets/rightArrow.svg';
import { useState } from 'react';
import PlaceModal from './PlaceModal';

const PlaceModalBox = () => {
  const [isLeftArrow, setIsLeftArrow] = useState(true);
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setIsLeftArrow(!isLeftArrow);
    setModal(!modal);
  };

  return (
    <div className={styles.container}>
      {modal === true ? <PlaceModal /> : null}
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
