import styles from './PlaceModalBox.module.scss';
import PlaceModal from './PlaceModal';

const PlaceModalBox = ({ selectedDates, selectedPlaces, onPlaceSelect }) => {
  return (
    <div className={styles.container}>
      <PlaceModal selectedDates={selectedDates} selectedPlaces={selectedPlaces} onPlaceSelect={onPlaceSelect} />
    </div>
  );
};

export default PlaceModalBox;
