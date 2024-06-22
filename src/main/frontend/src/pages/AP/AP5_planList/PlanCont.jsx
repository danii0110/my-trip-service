import HotelCont from './HotelCont';
import styles from './PlanCont.module.scss';
import { useState, useEffect } from 'react';
import TransportModal from './TransportModal';
import PickedPlaceCont from './PickedPlaceCont';
import regionMap from '../../../modules/utils/regionMap';

const PlanCont = ({ selectedDates, selectedRegion, selectedArea, selectedPlaces = {}, selectedHotels = [] }) => {
  const [showModal, setShowModal] = useState(false);

  const formattedDuration = `${selectedDates.start.toLocaleDateString()} - ${selectedDates.end.toLocaleDateString()}`;
  const regionName = regionMap[selectedRegion] || '없음';
  const tripName = `${regionName} ${selectedArea} 여행`;

  const generateDateRange = (start, end) => {
    const dateArray = [];
    let currentDate = new Date(start);

    while (currentDate <= new Date(end)) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  const dateRange = generateDateRange(selectedDates.start, selectedDates.end);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}. ${month}. ${day}.`;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tripNameCont}>
          <div className={styles.tripName}>{tripName}</div>
        </div>
        <div className={styles.durationCont}>
          <div className={styles.duration}>{formattedDuration}</div>
        </div>
        <div className={styles.pickedPlaceCont}>
          <div className={styles.pickedPlaceTextCont}>
            <div className={styles.pickedPlace}>선택한 장소</div>
          </div>
          {dateRange.map((date, index) => {
            const formattedDate = formatDate(date);
            const placesForDay = selectedPlaces[formattedDate] || []; // 기본값 빈 배열
            console.log(`Places for ${formattedDate}:`, placesForDay);
            return <PickedPlaceCont key={index} pickedDay={formattedDate} places={placesForDay} />;
          })}
        </div>
        <div className={styles.pickedHotelCont}>
          <div className={styles.pickedHotelTextCont}>
            <div className={styles.pickedHotel}>선택한 숙소</div>
          </div>
          <div className={styles.HotelImgCont}>
            {selectedHotels.map((hotel, index) => (
              <HotelCont key={index} day={`Day ${index + 1}`} hotelName={hotel.name} hotelImage={hotel.image} />
            ))}
          </div>
        </div>
        <div className={styles.btnsCont}>
          <button className={styles.addCartBtn} type='button'>
            장바구니에 추가
          </button>
          <button className={styles.makePlanBtn} type='button' onClick={() => setShowModal(true)}>
            일정 생성하기 &gt;
          </button>
        </div>
      </div>
      <TransportModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};

export default PlanCont;
