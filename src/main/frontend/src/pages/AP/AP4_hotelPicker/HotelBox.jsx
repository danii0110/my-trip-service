import { useState, useEffect } from 'react';
import styles from './HotelBox.module.scss';
import AddBtn from '../AP3_placePicker/AddBtn';

const HotelBox = ({ placeName, category, address, image, onAddClick }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      onAddClick(placeName);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.placeImg} style={{ backgroundImage: `url(${image})` }}></div>
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
