import styles from './HotelCont.module.scss';

const HotelCont = ({ day, hotelName, hotelImage }) => {
  return (
    <div className={styles.container}>
      <button className={styles.dayBtn}>{day}</button>
      <div className={styles.imgCont}>
        {hotelImage ? <img src={hotelImage} alt={hotelName} className={styles.image} /> : null}
      </div>
      <div className={styles.hotelName}>{hotelName}</div>
    </div>
  );
};

export default HotelCont;
