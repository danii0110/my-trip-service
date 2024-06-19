import styles from './HotelBox.module.scss';
import AddBtn from '../AP3_placePicker/AddBtn';
import { useState } from 'react';

const HotelBox = ({ placeName, category, address, onAddClick }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      onAddClick(placeName);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.placeImg}></div>
      <div className={styles.detailsCont}>
        <div className={styles.placeName}>{placeName}</div>
        <div className={styles.subDetails}>
          <div className={styles.category}>{category}</div>
          <div className={styles.address}>{address}</div>
        </div>
      </div>
      <AddBtn checked={isChecked} onChange={handleClick} />
    </div>
  );
};

export default HotelBox;
