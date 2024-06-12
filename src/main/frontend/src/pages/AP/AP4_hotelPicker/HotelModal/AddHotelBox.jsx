import styles from './AddHotelBox.module.scss';

const AddHotelBox = ({ id, placeName, duration }) => {
  return (
    <div className={styles.container}>
      <div className={styles.numberCont}>{id}</div>
      <div className={styles.boxCont}>
        <div className={styles.placeImg}></div>
        <div className={styles.detailsCont}>
          <div className={styles.duration}>{duration}</div>
          <div className={styles.placeName}>{placeName}</div>
        </div>
      </div>
    </div>
  );
};

export default AddHotelBox;
