import { useState } from 'react';
import AddHotelBox from './AddHotelBox';
import styles from './HotelModal.module.scss';

const initialPlaces = [
  { id: 1, placeName: '성산 일출봉', duration: '24.04.25-24.04.26' },
  { id: 2, placeName: '제주 돌하르방 공원', duration: '24.04.26-24.04.27' },
  { id: 3, placeName: '흑돼지 거리', duration: '24.04.27-24.04.28' },
  { id: 4, placeName: '제주 아르떼 뮤지엄', duration: '24.04.28-24.04.29' },
  { id: 5, placeName: '한라산 국립공원', duration: '24.04.30-24.04.31' },
];

const HotelModal = () => {
  const [places, setPlaces] = useState(initialPlaces);

  return (
    <div className={styles.container}>
      <div className={styles.total}>1일/4일</div>
      <div className={styles.main}>
        {places.map((place) => (
          <AddHotelBox key={place.id} id={place.id} placeName={place.placeName} duration={place.duration} />
        ))}
      </div>
    </div>
  );
};

export default HotelModal;
