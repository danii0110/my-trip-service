import { useEffect, useState } from 'react';
import AddHotelBox from './AddHotelBox';
import styles from './HotelModal.module.scss';

const HotelModal = ({ selectedDates = { start: null, end: null } }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (selectedDates.start && selectedDates.end) {
      const startDate = new Date(selectedDates.start);
      const endDate = new Date(selectedDates.end);
      const durationList = [];

      for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
        const nextDay = new Date(d);
        nextDay.setDate(d.getDate() + 1);
        durationList.push({
          id: durationList.length + 1,
          duration: `${d.toLocaleDateString('ko-KR').replaceAll('. ', '.')}-${nextDay
            .toLocaleDateString('ko-KR')
            .replaceAll('. ', '.')
            .replace('.', '.')}`,
          placeName: '숙소를 추가해주세요.',
        });
      }

      setPlaces(durationList);
      console.log('Duration List:', durationList); // 추가된 콘솔 로그
    }
  }, [selectedDates]);

  const totalDays = places.length; // 총 여행 일수
  console.log('Total Days:', totalDays); // 추가된 콘솔 로그
  console.log('Selected Dates:', selectedDates); // selectedDates가 올바르게 전달되었는지 확인

  return (
    <div className={styles.container}>
      <div className={styles.total}>x일/{totalDays}일</div>
      <div className={styles.main}>
        {places.map((place) => (
          <AddHotelBox key={place.id} id={place.id} placeName={place.placeName} duration={place.duration} />
        ))}
      </div>
    </div>
  );
};

export default HotelModal;
