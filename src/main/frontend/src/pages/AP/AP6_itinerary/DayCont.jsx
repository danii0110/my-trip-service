import styles from './DayCont.module.scss';
import MainCont from './MainCont';
const DayCont = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.day}>1일차</div>
        <div className={styles.date}>24.04.25</div>
      </div>
      <MainCont />
      <MainCont />
      <MainCont />
      <MainCont />
    </div>
  );
};
export default DayCont;
