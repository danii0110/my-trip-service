import styles from './CheckHeader.module.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';

const CheckHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pCont}>
        <p>
          Step1
          <br />
          날짜 확인
        </p>
        <p className={styles.second}>
          Step2
          <br />
          장소 선택
        </p>
        <p className={styles.third}>
          Step3
          <br />
          숙소 선택
        </p>
      </div>
      <ProgressBar now={33} variant='success' className={styles.progressBar} />
    </div>
  );
};
export default CheckHeader;
