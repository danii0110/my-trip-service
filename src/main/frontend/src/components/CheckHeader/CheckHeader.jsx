import styles from './CheckHeader.module.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';

const CheckHeader = ({ progress, firstColor, secondColor, thirdColor }) => {
  return (
    <div className={styles.container}>
      <div className={styles.pCont}>
        <p className={styles.first} style={{ color: firstColor }}>
          Step1
          <br />
          날짜 확인
        </p>
        <p className={styles.second} style={{ color: secondColor }}>
          Step2
          <br />
          장소 선택
        </p>
        <p className={styles.third} style={{ color: thirdColor }}>
          Step3
          <br />
          숙소 선택
        </p>
      </div>
      <ProgressBar now={progress} variant='success' className={styles.progressBar} />
    </div>
  );
};
export default CheckHeader;
