import styles from './PlaceModal.module.scss';
import LeftArrowIcon from '../../../../assets/leftArrow.svg';
import RightArrowIcon from '../../../../assets/rightArrow.svg';
import CalendarIcon from '../../../../assets/calendarIcon.svg';
import AddPlaceBox from './AddPlaceBox';
import { useState, useEffect } from 'react';
import DailyDatePickerModal from '../DailyDatePicker/DailyDatePickerModal';

const PlaceModal = ({
  selectedDates = { start: null, end: null },
  selectedPlaces = [],
  onPlaceSelect,
  onDateChange,
  currentSelectedDate,
}) => {
  const [places, setPlaces] = useState(selectedPlaces);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentSelectedDate);

  useEffect(() => {
    setPlaces(selectedPlaces);
  }, [selectedPlaces]);

  useEffect(() => {
    setSelectedDate(currentSelectedDate);
    console.log('currentSelectedDate:', currentSelectedDate);
  }, [currentSelectedDate]);

  const handleDelete = (id) => {
    onPlaceSelect(id, false);
  };

  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const handleDatePickerClose = (data) => {
    setIsDatePickerVisible(false);
    if (data && data.selectedDate) {
      const newDate = new Date(data.selectedDate);
      const formattedDate = newDate.toLocaleDateString('ko-KR');
      setSelectedDate(formattedDate);
      onDateChange(newDate);
    }
  };

  const handlePreviousDate = () => {
    const currentDate = new Date(selectedDate);
    const startDate = new Date(selectedDates.start);
    const prevDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
    if (prevDate >= startDate) {
      const formattedDate = prevDate.toLocaleDateString('ko-KR');
      setSelectedDate(formattedDate);
      onDateChange(prevDate);
    }
  };

  const handleNextDate = () => {
    const currentDate = new Date(selectedDate);
    const endDate = new Date(selectedDates.end);
    const nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    if (nextDate <= endDate) {
      const formattedDate = nextDate.toLocaleDateString('ko-KR');
      setSelectedDate(formattedDate);
      onDateChange(nextDate);
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
          places.map((place, index) => (
            <AddPlaceBox
              key={place.id}
              id={place.id}
              number={index + 1} // 인덱스 기반 번호 부여
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
