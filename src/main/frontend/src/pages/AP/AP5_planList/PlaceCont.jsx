import styles from './PlaceCont.module.scss';

const PlaceCont = ({ placeName }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgCont}></div>
      <div className={styles.placeName}>{placeName}</div>
    </div>
  );
};

export default PlaceCont;
