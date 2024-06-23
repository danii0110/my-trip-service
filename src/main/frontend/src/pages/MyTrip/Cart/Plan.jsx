import styles from './Plan.module.scss';
import WhiteX from '../../../assets/whiteX.svg';

const Plan = ({ date, areaName, planNum, onDelete }) => {
  return (
    <div className={styles.container}>
      <button className={styles.whiteX} onClick={onDelete}>
        <img className={styles.whiteXIcon} src={WhiteX} alt='white-x' />
      </button>
      <div className={styles.subCont}>
        <div className={styles.date}>{date}</div>
        <div className={styles.areaName}>{areaName}</div>
        <div className={styles.cartNum}>여행 플랜 개수 : {planNum}</div>
      </div>
    </div>
  );
};

export default Plan;
