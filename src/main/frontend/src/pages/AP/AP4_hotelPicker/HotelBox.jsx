import styles from './HotelBox.module.scss';
import AddBtn from '../AP3_placePicker/AddBtn';
import { useState, useEffect } from 'react';

const HotelBox = ({ placeName, category, address, image, onAddClick, selectedHotel }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (selectedHotel && selectedHotel.title === placeName) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [selectedHotel, placeName]);

  const handleClick = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      onAddClick(selectedHotel);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.placeImg} style={{ backgroundImage: `url(${selectedHotel?.firstimage || image})` }}></div>
      <div className={styles.detailsCont}>
        <div className={styles.placeName}>{selectedHotel?.title || placeName}</div>
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
