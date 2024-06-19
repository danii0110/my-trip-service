import styles from './HotelCont.module.scss';
import AddBtnIcon from '../../../../assets/addBtnIcon.svg';

const HotelCont = ({ date, hotelName, isSelected, onSelect }) => {
  return (
    <div className={styles.container} onClick={onSelect}>
      <div className={styles.date}>{date}</div>
      <button className={`${styles.btn} ${isSelected ? styles.selected : ''}`}>
        <img className={styles.addBtnIcon} src={AddBtnIcon} alt='addBtn-icon' />
      </button>
      <div className={styles.hotelName}>{hotelName}</div>
    </div>
  );
};

export default HotelCont;
