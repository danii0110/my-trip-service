import { useState, useEffect } from 'react';
import styles from './PlaceBox.module.scss';
import AddBtn from './AddBtn';

const PlaceBox = ({ id, placeName, category, address, image, mapX, mapY, onSelect, isInitiallyChecked = false }) => {
  const [isChecked, setIsChecked] = useState(isInitiallyChecked);

  useEffect(() => {
    setIsChecked(isInitiallyChecked);
  }, [isInitiallyChecked]);

  const handleClick = () => {
    if (isChecked) return; // 이미 선택된 경우 추가 방지
    console.log('AddBtn 클릭됨:', id);
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onSelect(id, { id, placeName, category, address, image, mapX, mapY, isChecked: newCheckedState });
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

export default PlaceBox;
