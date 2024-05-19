import { Button } from 'react-bootstrap';
import styles from './HotelCont.module.scss';
const HotelCont = () => {
  return (
    <div className={styles.container}>
      <button className={styles.dayBtn}>Day1</button>
      <div className={styles.imgCont}></div>
      <div className={styles.hotelName}>숙소명</div>
    </div>
  );
};
export default HotelCont;
