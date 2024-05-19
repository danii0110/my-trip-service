import styles from './PlaceCont.module.scss';
const PlaceCont = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgCont}></div>
      <div className={styles.placeName}>장소명</div>
    </div>
  );
};
export default PlaceCont;
