import styles from './PickedPlaceCont.module.scss';
import PlaceCont from './PlaceCont';

const PickedPlaceCont = ({ pickedDay, places }) => {
  return (
    <div className={styles.container}>
      <div className={styles.pickedDay}>{pickedDay}</div>
      <div className={styles.placeImgCont}>
        {places.map((place, index) => (
          <PlaceCont key={index} placeName={place} />
        ))}
      </div>
    </div>
  );
};

export default PickedPlaceCont;
