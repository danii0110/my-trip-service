import styles from './PlaceModalBox.module.scss';
import PlaceModal from './PlaceModal';

const PlaceModalBox = ({
  selectedDates,
  selectedPlaces,
  onPlaceSelect,
  currentSelectedDate,
  onDateChange,
  placeDurations,
  selectedTimes,
}) => {
  return (
    <div className={styles.container}>
      <PlaceModal
        selectedDates={selectedDates}
        selectedPlaces={selectedPlaces}
        onPlaceSelect={onPlaceSelect}
        currentSelectedDate={currentSelectedDate}
        onDateChange={onDateChange}
        placeDurations={placeDurations}
        selectedTimes={selectedTimes}
      />
    </div>
  );
};

export default PlaceModalBox;
