import styles from './MainCont.module.scss';
import MoveTime from './MoveTime';

const MainCont = ({ time, tag, place, moveTime, showMoveTime = true, image }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.infoCont}>
          <div className={styles.time}>{time}</div>
          <div className={styles.tag}>{tag}</div>
          <div className={styles.place}>{place}</div>
        </div>
        <div className={styles.placeImg} style={{ backgroundImage: `url(${image})` }}></div>
      </div>
      {showMoveTime && <MoveTime moveTime={moveTime} />}
    </>
  );
};

export default MainCont;
