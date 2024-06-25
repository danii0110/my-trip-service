import styles from './MainCont.module.scss';
import MoveTime from './MoveTime';

const categoryMap = {
  RESTAURANT: '음식점',
  SHOPPING: '쇼핑',
  CULTURAL_FACILITY: '문화시설',
  LEISURE_SPORTS: '레포츠',
  TOURIST_SPOT: '여행지',
  ACCOMMODATION: '숙박',
  UNKNOWN: '알 수 없음',
};

const MainCont = ({ time, tag, place, moveTime, showMoveTime = true, image }) => {
  const translatedTag = categoryMap[tag] || tag; // 카테고리를 한글로 변환

  return (
    <>
      <div className={styles.container}>
        <div className={styles.infoCont}>
          <div className={styles.time}>{time}</div>
          <div className={styles.tag}>{translatedTag}</div>
          <div className={styles.place}>{place}</div>
        </div>
        <div className={styles.placeImg} style={{ backgroundImage: `url(${image})` }}></div>
      </div>
      {showMoveTime && <MoveTime moveTime={moveTime} />}
    </>
  );
};

export default MainCont;
