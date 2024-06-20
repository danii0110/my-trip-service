import styles from './HotelCont.module.scss';
import AddBtnIcon from '../../../../assets/addBtnIcon.svg';

const HotelCont = ({ date, hotelName, isSelected, onSelect, image }) => {
  return (
    <div className={styles.container} onClick={onSelect}>
      <div className={styles.date}>{date}</div>
      <button className={styles.btn}>
        {image ? (
          <img className={styles.addBtnIcon} src={image} alt='hotel-img' />
        ) : (
          <img className={styles.addBtnIcon} src={AddBtnIcon} alt='addBtn-icon' />
        )}
      </button>
      <div className={styles.hotelName}>{hotelName}</div>
    </div>
  );
};

export default HotelCont;
