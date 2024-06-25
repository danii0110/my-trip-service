import styles from './AIRouteModal.module.scss';
import React, { useState } from 'react';
import axios from "axios";

const AIRouteModal = (planId) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleButtonClick = () => {
    setLoading(true);
    evaluateSchedule(planId.planId);
  };

  const evaluateSchedule = async (planId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/chatgpt/evaluate/plan/${planId}`);
      setFeedback(response.data);
    } catch (error) {
      console.error('Error evaluating schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modal}>
      {!loading && !feedback && (
        <button className={styles.evaluateButton} onClick={handleButtonClick}>
          현재 루트에 대해 AI 루트 평가
        </button>
      )}
      {loading && <div className={styles.loading}>로딩 중...</div>}
      {feedback &&
          <div className={styles.feedback}>
            <p dangerouslySetInnerHTML={{__html: feedback.replace(/\n/g, '<br />')}}/>
          </div>}
    </div>
  );
};

export default AIRouteModal;
