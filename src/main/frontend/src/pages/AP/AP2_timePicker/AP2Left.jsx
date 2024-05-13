import styles from './AP2Left.module.scss';
import { Button } from 'react-bootstrap';
import TrainIcon from '../../../assets/trainIcon.svg';
import CalendarIcon from '../../../assets/calendarIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckHeader from '../../../components/CheckHeader/CheckHeader';
import TimeTable from './TimeTable';

const AP2Left = () => {
  return (
    <>
      <CheckHeader progress={33} firstColor='#000000' secondColor='#aab1b8' thirdColor='#aab1b8' />
      <div className={styles.titleArea}>광주 동구</div>
      <div className={styles.reserveTransportation}>
        <div className={styles.subTitle}>
          <img className={styles.trainIcon} src={TrainIcon} alt='train-icon' />
          교통수단 예매
        </div>
        <div className={styles.buttons}>
          <Button id={styles.reserveBtn}>고속버스 예매</Button>
          <Button id={styles.reserveBtn}>KTX 예매</Button>
          <Button id={styles.reserveBtn}>SRT 예매</Button>
        </div>
      </div>
      <div className={styles.dateChecker}>
        <div className={styles.subTitle}>
          <img className={styles.calendarIcon} src={CalendarIcon} alt='calendar-icon' />
          24.04.25(목) - 24.04.29(월)
        </div>
        <div className={styles.timeCont}>
          <div>여행시간 상세설정</div>
          <div className={styles.totalTime}>총70시간 00분</div>
        </div>
        <p className={styles.timeExp}>
          각 날짜의 일정 시작시간과 종료시간을 설정해 주세요.
          <br />
          기본 설정 시간은 오전 10시~오후 10시 총 12시간입니다.
        </p>
        <TimeTable />
      </div>
    </>
  );
};
export default AP2Left;
