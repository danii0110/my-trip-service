import styles from './AddHotelBox.module.scss';
import BeforeAddHotelImg from '../../../../assets/beforeAddHotelImg.svg';

const AddHotelBox = ({ id, placeName, duration }) => {
  return (
    <div className={styles.container}>
      <div className={styles.numberCont}>{id}</div>
      <div className={styles.boxCont}>
        <img className={styles.beforeAddHotelImg} src={BeforeAddHotelImg} alt={'before-add-hotel-img'} />
        <div className={styles.detailsCont}>
          <div className={styles.duration}>{duration}</div>
          <div className={styles.placeName}>{placeName}</div>
        </div>
      </div>
    </div>
  );
};

export default AddHotelBox;
