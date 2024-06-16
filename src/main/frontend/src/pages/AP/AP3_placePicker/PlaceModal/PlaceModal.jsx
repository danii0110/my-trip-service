import styles from './PlaceModal.module.scss';
import LeftArrowIcon from '../../../../assets/leftArrow.svg';
import RightArrowIcon from '../../../../assets/rightArrow.svg';
import CalendarIcon from '../../../../assets/calendarIcon.svg';
import AddPlaceBox from './AddPlaceBox';
import { useState, useEffect } from 'react';
import DailyDatePickerModal from '../DailyDatePicker/DailyDatePickerModal';

const initialPlaces = [
  { id: 1, placeName: '성산 일출봉', category: '명소', address: '대한민국 서귀포시 성산 일출봉' },
  { id: 2, placeName: '제주 돌하르방 공원', category: '명소', address: '대한민국 제주특별자치도 제주시' },
  { id: 3, placeName: '흑돼지 거리', category: '식당', address: '대한민국 제주특별자치도 제주시' },
  { id: 4, placeName: '제주 아르떼 뮤지엄', category: '문화시설', address: '대한민국 제주특별자치도 제주시' },
  { id: 5, placeName: '한라산 국립공원', category: '레포츠', address: '대한민국 제주특별자치도 제주시' },
];

const PlaceModal = ({ selectedDates = { start: null, end: null } }) => {
  // 기본값 설정
  const [places, setPlaces] = useState(initialPlaces);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    selectedDates.start ? new Date(selectedDates.start).toLocaleDateString('ko-KR') : ''
  );

  const handleDelete = (id) => {
    setPlaces(places.filter((place) => place.id !== id));
  };

  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const handleDatePickerClose = (data) => {
    setIsDatePickerVisible(false);
    if (data && data.selectedDate) {
      setSelectedDate(data.selectedDate.toLocaleDateString('ko-KR'));
    }
  };

  const handlePreviousDate = () => {
    const currentDate = new Date(selectedDate);
    const startDate = new Date(selectedDates.start);
    const prevDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
    if (prevDate >= startDate) {
      setSelectedDate(prevDate.toLocaleDateString('ko-KR'));
    }
  };

  const handleNextDate = () => {
    const currentDate = new Date(selectedDate);
    const endDate = new Date(selectedDates.end);
    const nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    if (nextDate <= endDate) {
      setSelectedDate(nextDate.toLocaleDateString('ko-KR'));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.arrowIcon} src={LeftArrowIcon} alt='left-arrow-icon' onClick={handlePreviousDate} />
        <div className={styles.headerCenter}>
          <img className={styles.calendarIcon} src={CalendarIcon} alt='calendar-icon' onClick={toggleDatePicker} />
          <div className={styles.selectDateCont}>{selectedDate}</div>
        </div>
        <img className={styles.arrowIcon} src={RightArrowIcon} alt='right-arrow-icon' onClick={handleNextDate} />
      </div>
      <div className={styles.subHeader}>
        <div>9:00 ~ 12:00</div>
        <div>소요 시간/총 시간</div>
      </div>
      <div className={styles.main}>
        {places.length === 0 ? (
          <div className={styles.noPlaceCont}>장소를 선택해주세요</div>
        ) : (
          places.map((place) => (
            <AddPlaceBox
              key={place.id}
              id={place.id}
              placeName={place.placeName}
              category={place.category}
              address={place.address}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
      {isDatePickerVisible && (
        <DailyDatePickerModal
          show={isDatePickerVisible}
          onHide={handleDatePickerClose}
          startDate={selectedDates.start ? new Date(selectedDates.start) : new Date()}
          endDate={selectedDates.end ? new Date(selectedDates.end) : new Date()}
        />
      )}
    </div>
  );
};

export default PlaceModal;
