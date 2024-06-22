import HotelCont from './HotelCont';
import styles from './PlanCont.module.scss';
import { useState, useEffect } from 'react';
import TransportModal from './TransportModal';
import PickedPlaceCont from './PickedPlaceCont';
import regionMap from '../../../modules/utils/regionMap'; // regionMap 추가

const PlanCont = ({ selectedDates, selectedRegion, selectedArea, selectedPlaces = {} }) => {
  const [showModal, setShowModal] = useState(false);

  const hotels = [
    { day: 'Day1', hotelName: '롯데호텔 제주' },
    { day: 'Day2', hotelName: '그랜드 조선 제주' },
    { day: 'Day3', hotelName: '제주 신라호텔' },
    { day: 'Day4', hotelName: '해비치 호텔 & 리조트 제주' },
    { day: 'Day5', hotelName: '메종 글래드 제주' },
    { day: 'Day6', hotelName: '라마다 프라자 제주' },
    { day: 'Day7', hotelName: '해안로 호텔' },
    { day: 'Day8', 호텔Name: '호텔 난타 제주' },
    { day: 'Day9', 호텔Name: '더 쇼어 호텔 제주' },
  ];

  const formattedDuration = `${selectedDates.start.toLocaleDateString()} - ${selectedDates.end.toLocaleDateString()}`;
  const regionName = regionMap[selectedRegion] || '없음';
  const tripName = `${regionName} ${selectedArea} 여행`;

  // 날짜 범위 생성
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

  // 날짜 형식 변환 (yyyy. m. d.)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 공백 없이 변환
    const day = date.getDate(); // 공백 없이 변환
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
            console.log(`Formatted Date: ${formattedDate}`);
            console.log(`Places for ${formattedDate}:`, placesForDay); // 콘솔 로그 추가
            return <PickedPlaceCont key={index} pickedDay={formattedDate} places={placesForDay} />;
          })}
        </div>
        <div className={styles.pickedHotelCont}>
          <div className={styles.pickedHotelTextCont}>
            <div className={styles.pickedHotel}>선택한 숙소</div>
          </div>
          <div className={styles.HotelImgCont}>
            {hotels.map((hotel, index) => (
              <HotelCont key={index} day={hotel.day} hotelName={hotel.hotelName} />
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
