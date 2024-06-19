import styles from './AIRouteModal.module.scss';
import { useState } from 'react';

const AIRouteModal = () => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFeedback(`
        이동 시간이 하루 일정의 43%를 차지합니다.
        숙소와 방문 장소의 거리가 약 600분입니다.
        1일차 계획에 식당이 존재하지 않습니다.
        1일차 - 장소A에 머무는 시간이 10분으로 매우 짧습니다.
      `);
    }, 2000);
  };

  return (
    <div className={styles.modal}>
      {!loading && !feedback && (
        <button className={styles.evaluateButton} onClick={handleButtonClick}>
          현재 루트에 대해 AI 루트 평가
        </button>
      )}
      {loading && <div className={styles.loading}>로딩 중...</div>}
      {feedback && <div className={styles.feedback}>{feedback}</div>}
    </div>
  );
};

export default AIRouteModal;
