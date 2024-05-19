import styles from './MainCont.module.scss';
import MoveTime from './MoveTime';
const MainCont = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.infoCont}>
          <div className={styles.time}>9:00-12:00</div>
          <div className={styles.tag}>명소</div>
          <div className={styles.place}>성산 일출봉</div>
        </div>
        <div className={styles.placeImg}></div>
      </div>
      <MoveTime />
    </>
  );
};
export default MainCont;
