import { useState, useEffect } from 'react';
import styles from './PlaceBox.module.scss';
import AddBtn from './AddBtn';

const PlaceBox = ({ id, placeName, category, address, onSelect, isSelected }) => {
  const [isChecked, setIsChecked] = useState(isSelected);

  useEffect(() => {
    setIsChecked(isSelected);
  }, [isSelected]);

  const handleClick = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onSelect(id, newCheckedState);
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

export default PlaceBox;
