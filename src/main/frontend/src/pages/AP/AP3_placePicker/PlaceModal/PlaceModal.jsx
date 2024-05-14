import styles from './PlaceModal.module.scss';
import LeftArrowIcon from '../../../../assets/leftArrow.svg';
import RightArrowIcon from '../../../../assets/rightArrow.svg';
import CalendarIcon from '../../../../assets/calendarIcon.svg';
import AddPlaceBox from './AddPlaceBox';

const PlaceModal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.arrowIcon} src={LeftArrowIcon} alt='left-arrow-icon' />
        <div className={styles.headerCenter}>
          <img className={styles.calendarIcon} src={CalendarIcon} alt='calendar-icon' />
          <p>4/25</p>
        </div>
        <img className={styles.arrowIcon} src={RightArrowIcon} alt='right-arrow-icon' />
      </div>
      <div className={styles.subHeader}>
        <div>9:00 ~ 12:00</div>
        <div>소요 시간/총 시간</div>
      </div>
      <div className={styles.main}>
        <AddPlaceBox />
        {/* <AddPlaceBox />
        <AddPlaceBox />
        <AddPlaceBox />
        <AddPlaceBox /> */}
      </div>
    </div>
  );
};

export default PlaceModal;
