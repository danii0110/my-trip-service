import { useEffect, useState } from 'react';
import AddHotelBox from './AddHotelBox';
import styles from './HotelModal.module.scss';
import { convertDateToDurationFormat } from '../../../../modules/utils/dateUtils';

const HotelModal = ({ selectedDates = { start: null, end: null }, selectedHotels = [] }) => {
  const [places, setPlaces] = useState([]);
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    if (selectedDates.start && selectedDates.end) {
      const startDate = new Date(selectedDates.start);
      const endDate = new Date(selectedDates.end);
      const durationList = [];

      for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
        const nextDay = new Date(d);
        nextDay.setDate(d.getDate() + 1);
        const duration = `2024.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d
          .getDate()
          .toString()
          .padStart(2, '0')}.-2024.${(nextDay.getMonth() + 1).toString().padStart(2, '0')}.${nextDay
          .getDate()
          .toString()
          .padStart(2, '0')}.`;

        const matchingHotel = selectedHotels.find((hotel) => {
          const formattedDate = convertDateToDurationFormat(hotel.date);
          return formattedDate === duration;
        });

        durationList.push({
          id: durationList.length + 1,
          duration: duration,
          placeName: matchingHotel ? matchingHotel.name : '숙소를 추가해주세요.',
          image: matchingHotel ? matchingHotel.image : null,
        });
      }

      setPlaces(durationList);

      // totalDays를 유효한 호텔 정보의 개수로 계산
      const validHotelsCount = selectedHotels.filter((hotel) => hotel.name !== '호텔 선택').length;
      setTotalDays(validHotelsCount);
    }
  }, [selectedDates, selectedHotels]);

  return (
    <div className={styles.container}>
      <div className={styles.total}>
        {totalDays}일/{places.length}일
      </div>
      <div className={styles.main}>
        {places.map((place) => (
          <AddHotelBox
            key={place.id}
            id={place.id}
            placeName={place.placeName}
            duration={place.duration}
            image={place.image}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelModal;
