// PlaceModalBox.jsx
import styles from './PlaceModalBox.module.scss';
import PlaceModal from './PlaceModal';

const PlaceModalBox = ({
  selectedDates,
  selectedTimes,
  selectedPlaces,
  onPlaceSelect,
  currentSelectedDate,
  onDateChange,
}) => {
  console.log('PlaceModalBox - selectedTimes:', selectedTimes); // 콘솔 추가
  return (
    <div className={styles.container}>
      <PlaceModal
        selectedDates={selectedDates}
        selectedTimes={selectedTimes} // 추가된 부분
        selectedPlaces={selectedPlaces}
        onPlaceSelect={onPlaceSelect}
        currentSelectedDate={currentSelectedDate}
        onDateChange={onDateChange}
      />
    </div>
  );
};

export default PlaceModalBox;
