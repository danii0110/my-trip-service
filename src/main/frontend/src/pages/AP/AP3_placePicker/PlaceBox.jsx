import { useState } from 'react';
import styles from './PlaceBox.module.scss';
import AddBtn from './AddBtn';
const PlaceBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.placeImg}></div>
      <div className={styles.detailsCont}>
        <div className={styles.placeName}>성산 일출봉</div>
        <div className={styles.subDetails}>
          <div className={styles.category}>명소</div>
          <div className={styles.address}>대한민국 서귀포시 성산 일출봉</div>
        </div>
      </div>
      <AddBtn checked={isChecked} onChange={handleClick} />
    </div>
  );
};
export default PlaceBox;
