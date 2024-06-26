import { useState, useEffect } from 'react';
import styles from './PlaceModal.module.scss';
import LeftArrowIcon from '../../../../assets/leftArrow.svg';
import RightArrowIcon from '../../../../assets/rightArrow.svg';
import CalendarIcon from '../../../../assets/calendarIcon.svg';
import AddPlaceBox from './AddPlaceBox';
import DailyDatePickerModal from '../DailyDatePicker/DailyDatePickerModal';
import TimeOverModal from '../TimeOverModal/TimeOverModal';

const PlaceModal = ({
  selectedDates = { start: null, end: null },
  selectedPlaces = [],
  onPlaceSelect,
  onDateChange,
  currentSelectedDate,
  selectedTimes,
}) => {
  const [places, setPlaces] = useState(selectedPlaces);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentSelectedDate);
  const [placeDurations, setPlaceDurations] = useState({});
  const [totalDuration, setTotalDuration] = useState(0);
  const [showTimeOverModal, setShowTimeOverModal] = useState(false); // TimeOverModal 상태 추가

  useEffect(() => {
    setPlaces(selectedPlaces);
  }, [selectedPlaces]);

  useEffect(() => {
    setSelectedDate(currentSelectedDate);
  }, [currentSelectedDate]);

  useEffect(() => {
    const totalDurationForDate = places.reduce((total, place) => {
      return total + (placeDurations[place.id] || 120);
    }, 0);
    setTotalDuration(totalDurationForDate);
  }, [places, placeDurations]);

  const handleDelete = (id) => {
    onPlaceSelect(id, false);
    setPlaceDurations((prevDurations) => {
      const updatedDurations = { ...prevDurations };
      delete updatedDurations[id];
      return updatedDurations;
    });
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

  const handleDurationChange = (id, newDuration) => {
    const newPlaceDurations = { ...placeDurations, [id]: parseInt(newDuration, 10) };

    const totalDurationForDate = places.reduce((total, place) => {
      return total + (newPlaceDurations[place.id] || 120);
    }, 0);

    const startTimeInMinutes = parseTimeToMinutes(selectedTimes[currentSelectedDate].start);
    const endTimeInMinutes = parseTimeToMinutes(selectedTimes[currentSelectedDate].end);
    const totalTimeInMinutes = endTimeInMinutes - startTimeInMinutes;

    if (totalDurationForDate > totalTimeInMinutes) {
      setShowTimeOverModal(true); // 시간 초과 시 모달 표시
    } else {
      setPlaceDurations(newPlaceDurations);
    }
  };

  const parseTimeToMinutes = (time) => {
    const [period, timeStr] = time.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    if (period === '오후' && hours !== 12) hours += 12;
    if (period === '오전' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}시간 ${remainingMinutes}분`;
  };

  const startTimeInMinutes = parseTimeToMinutes(selectedTimes[currentSelectedDate].start);
  const endTimeInMinutes = parseTimeToMinutes(selectedTimes[currentSelectedDate].end);
  const totalTimeInMinutes = endTimeInMinutes - startTimeInMinutes;

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
        <div>
          {selectedTimes && selectedTimes[currentSelectedDate]
            ? `${selectedTimes[currentSelectedDate].start} ~ ${selectedTimes[currentSelectedDate].end}`
            : ''}
        </div>
        <div>{`${formatDuration(totalDuration)} / ${
          totalTimeInMinutes > 0
            ? `${Math.floor(totalTimeInMinutes / 60)}시간 ${totalTimeInMinutes % 60}분`
            : '시간 정보 없음'
        }`}</div>
      </div>
      <div className={styles.main}>
        {places.length === 0 ? (
          <div className={styles.noPlaceCont}>장소를 선택해주세요</div>
        ) : (
          places.map((place, index) => (
            <AddPlaceBox
              key={`${place.id}-${currentSelectedDate}-${index}`} // 고유한 key 추가
              id={place.id}
              number={index + 1}
              placeName={place.title}
              category={place.category}
              address={place.addr1}
              onDelete={handleDelete}
              duration={placeDurations[place.id] || 120}
              onDurationChange={handleDurationChange}
              image={place.firstimage}
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
      <TimeOverModal
        show={showTimeOverModal}
        onHide={() => setShowTimeOverModal(false)}
        onConfirm={() => setShowTimeOverModal(false)}
      />
    </div>
  );
};

export default PlaceModal;
