import styles from './HotelCont.module.scss';

const HotelCont = ({ day, hotelName }) => {
  return (
    <div className={styles.container}>
      <button className={styles.dayBtn}>{day}</button>
      <div className={styles.imgCont}></div>
      <div className={styles.hotelName}>{hotelName}</div>
    </div>
  );
};

export default HotelCont;
