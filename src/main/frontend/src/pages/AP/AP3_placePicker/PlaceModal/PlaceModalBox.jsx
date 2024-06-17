import styles from './PlaceModalBox.module.scss';
import PlaceModal from './PlaceModal';

const PlaceModalBox = ({
  selectedDates,
  selectedPlaces,
  onPlaceSelect,
  currentSelectedDate,
  onDateChange,
  placeDurations,
  selectedTimes, // 추가된 부분
}) => {
  return (
    <div className={styles.container}>
      <PlaceModal
        selectedDates={selectedDates}
        selectedPlaces={selectedPlaces}
        onPlaceSelect={onPlaceSelect}
        currentSelectedDate={currentSelectedDate}
        onDateChange={onDateChange}
        placeDurations={placeDurations} // 전달
        selectedTimes={selectedTimes} // 전달
      />
    </div>
  );
};

export default PlaceModalBox;
