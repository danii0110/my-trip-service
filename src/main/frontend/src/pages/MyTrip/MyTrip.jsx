import styles from './MyTrip.module.scss';
import QuestionIcon from '../../assets/questionIcon.svg';
import { useState } from 'react';
import Schedule from './Schedule';

const MyTrip = () => {
  const [selected, setSelected] = useState('total');

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>MyTrip</div>
        <div className={styles.subCont}>
          <div className={styles.subtitleCont}>
            <div className={styles.subtitle}>나의 여행</div>
            <button className={styles.questionIcon}>
              <img src={QuestionIcon} alt='question-icon' />
            </button>
          </div>
          <div className={styles.scheduleCont}>
            <button
              type='button'
              className={`${styles.scheduleBtn} ${selected === 'total' ? styles.selected : ''}`}
              onClick={() => setSelected('total')}
            >
              전체 일정
            </button>

            <button
              type='button'
              className={`${styles.scheduleBtn} ${selected === 'share' ? styles.selected : ''}`}
              onClick={() => setSelected('share')}
            >
              공유된 일정
            </button>
          </div>
          <Schedule />
          <Schedule />
          <Schedule />
          <Schedule />
          <Schedule />
        </div>
      </div>
    </div>
  );
};
export default MyTrip;
