import styles from './PlaceModalBox.module.scss';
import PlaceModal from './PlaceModal';

const PlaceModalBox = ({ selectedDates }) => {
  return (
    <div className={styles.container}>
      <PlaceModal selectedDates={selectedDates} />
    </div>
  );
};

export default PlaceModalBox;
