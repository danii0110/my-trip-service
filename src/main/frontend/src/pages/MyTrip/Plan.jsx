import styles from './Plan.module.scss';
import WhiteX from '../../assets/whiteX.svg';

const Plan = () => {
  return (
    <div className={styles.container}>
      <button className={styles.whiteX}>
        <img className={styles.whiteXIcon} src={WhiteX} alt='white-x' />
      </button>
      <div className={styles.subCont}>
        <div className={styles.date}>24.04.25-24.04.28</div>
        <div className={styles.areaName}>광주 동구</div>
        <div className={styles.cartNum}>나의 여행 도시 개수 : 1</div>
      </div>
    </div>
  );
};
export default Plan;
