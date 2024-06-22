import styles from './PlaceCont.module.scss';

const PlaceCont = ({ placeName, placeImage }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgCont}>
        {placeImage ? <img src={placeImage} alt={placeName} className={styles.image} /> : null}
      </div>
      <div className={styles.placeName}>{placeName}</div>
    </div>
  );
};

export default PlaceCont;
