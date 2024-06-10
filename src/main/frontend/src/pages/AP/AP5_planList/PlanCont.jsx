import HotelCont from './HotelCont';
import styles from './PlanCont.module.scss';
import { useState } from 'react';
import TransportModal from './TransportModal';
import PickedPlaceCont from './PickedPlaceCont';

const PlanCont = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditingTripName, setIsEditingTripName] = useState(false);
  const [tripName, setTripName] = useState('여행 이름');

  const handleTripNameChange = (e) => {
    setTripName(e.target.value);
  };

  const hotels = [
    { day: 'Day1', hotelName: '롯데호텔 제주' },
    { day: 'Day2', hotelName: '그랜드 조선 제주' },
    { day: 'Day3', hotelName: '제주 신라호텔' },
    { day: 'Day4', hotelName: '해비치 호텔 & 리조트 제주' },
    { day: 'Day5', hotelName: '메종 글래드 제주' },
    { day: 'Day6', hotelName: '라마다 프라자 제주' },
    { day: 'Day7', hotelName: '해안로 호텔' },
    { day: 'Day8', hotelName: '호텔 난타 제주' },
    { day: 'Day9', hotelName: '더 쇼어 호텔 제주' },
  ];

  const pickedPlaces = [
    {
      day: '24.04.25',
      places: [
        '성산일출봉',
        '한라산',
        '우도',
        '만장굴',
        '섭지코지',
        '비자림',
        '제주 돌문화공원',
        '제주 아쿠아플라넷',
        '삼양검은모래해변',
      ],
    },
    {
      day: '24.04.26',
      places: [
        '협재해수욕장',
        '비양도',
        '오설록 티뮤지엄',
        '한림공원',
        '김녕미로공원',
        '금능해수욕장',
        '월정리해변',
        '이호테우해변',
      ],
    },
    {
      day: '24.04.27',
      places: ['천지연폭포', '정방폭포', '용두암', '한라수목원', '제주 목장', '사라봉', '도두봉'],
    },
    {
      day: '24.04.28',
      places: ['한림공원', '제주 민속촌', '새별오름', '용머리해안', '주상절리대', '송악산', '알뜨르비행장', '산방산'],
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tripNameCont}>
          {isEditingTripName ? (
            <input
              type='text'
              value={tripName}
              onChange={handleTripNameChange}
              onBlur={() => setIsEditingTripName(false)}
              className={styles.tripNameInput}
            />
          ) : (
            <div className={styles.tripName}>{tripName}</div>
          )}
          <div className={styles.editText} onClick={() => setIsEditingTripName(true)}>
            편집
          </div>
        </div>
        <div className={styles.durationCont}>
          <div className={styles.duration}>24.04.25-24.04.29</div>
          <div className={styles.editText}>편집</div>
        </div>
        <div className={styles.pickedPlaceCont}>
          <div className={styles.pickedPlaceTextCont}>
            <div className={styles.pickedPlace}>선택한 장소</div>
            <div className={styles.editText}>편집</div>
          </div>
          {pickedPlaces.map((pickedPlace, index) => (
            <PickedPlaceCont key={index} pickedDay={pickedPlace.day} places={pickedPlace.places} />
          ))}
        </div>
        <div className={styles.pickedHotelCont}>
          <div className={styles.pickedHotelTextCont}>
            <div className={styles.pickedHotel}>선택한 숙소</div>
            <div className={styles.editText}>편집</div>
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
