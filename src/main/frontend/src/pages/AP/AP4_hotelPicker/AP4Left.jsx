import styles from './AP4Left.module.scss';
import CheckHeader from '../AP2_timePicker/CheckHeader/CheckHeader';
import SearchBar from '../AP3_placePicker/SearchBar/SearchBar';
import { Button } from 'react-bootstrap';
import PlaceBox from '../AP3_placePicker/PlaceBox';

const AP4Left = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <CheckHeader progress={100} firstColor='#aab1b8' secondColor='#aab1b8' thirdColor='#000000' />
          <div className={styles.leftHeader}>
            <div className={styles.titleArea}>광주 동구</div>
            <Button id={styles.btnCommon} className={styles.reserveBtn}>
              숙소 예매
            </Button>
          </div>
          <div className={styles.showDate}>24.04.25(목) - 24.04.29(월)</div>
          <div className={styles.searchBar}>
            <SearchBar />
          </div>
          <Button id={styles.btnCommon} className={styles.categoryBtn}>
            추천 숙소
          </Button>
          <div className={styles.places}>
            <PlaceBox />
            <PlaceBox />
            <PlaceBox />
            <PlaceBox />
            <PlaceBox />
          </div>
        </div>
      </div>
    </>
  );
};
export default AP4Left;
