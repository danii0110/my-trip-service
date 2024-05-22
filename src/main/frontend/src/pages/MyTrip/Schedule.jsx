import styles from './Schedule.module.scss';
import DotsIcon from '../../assets/dotsIcon.svg';

const Schedule = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tripImg}></div>
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.dDayCont}>D-day</div>
          <div className={styles.areaName}>광주 동구</div>
        </div>
        <div className={styles.tripTitleCont}>
          <div className={styles.tripTitle}>즐거운 가족 여행</div>
          <div className={styles.edit}>수정</div>
        </div>
        <div className={styles.duration}>24.04.21~24.04.25</div>
        <div className={styles.shareCont}>
          <div className={styles.hostCont}>호스트</div>
          <div className={styles.checkCont}>공유일정</div>
          <div className={styles.partyCont}>일행+1</div>
        </div>
      </div>
      <div className={styles.editDateCont}>최근수정일 2024-05-16</div>
      <button className={styles.dotsIcon}>
        <img src={DotsIcon} alt='dots-icon' />
      </button>
    </div>
  );
};
export default Schedule;
