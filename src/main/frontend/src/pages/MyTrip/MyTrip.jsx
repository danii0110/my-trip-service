import styles from './MyTrip.module.scss';
import QuestionIcon from '../../assets/questionIcon.svg';
import { useState, useEffect } from 'react';
import Schedule from './Schedule';
import axios from 'axios';

const MyTrip = () => {
  const [selected, setSelected] = useState('total');
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const userId = localStorage.getItem('userId'); // 또는 다른 방법으로 userId를 가져옵니다.

      try {
        const response = await axios.get(`/api/users/${userId}/plans`);
        setSchedules(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []); // 초기 렌더링 시 데이터 가져오기

  const handleDelete = (index) => {
    const newSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedules);
  };

  const filteredSchedules = schedules;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>MyTrip</div>
        <div className={styles.subCont}>
          <div className={styles.subtitleCont}>
            <div className={styles.subtitle}>나의 여행</div>
            <button className={styles.questionIcon}>
              <img src={QuestionIcon} alt='question-icon' />
              <div className={styles.tooltip}>
                AI 일정 최적화 후에 최종 저장된 여행 일정 목록입니다. 우측 리스트 버튼을 눌러 다른 사람과 일정을 공유할
                수 있습니다.
              </div>
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
          </div>
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((schedule, index) => (
              <Schedule
                key={index}
                data={{
                  tripTitle: schedule.title,
                  areaName: schedule.region,
                  duration: `${schedule.startDate} ~ ${schedule.endDate}`, // 수정된 부분: 일정 기간 설정
                  lastEdited: new Date().toLocaleDateString(), // 예시로 현재 날짜 사용
                }}
                onDelete={() => handleDelete(index)}
              />
            ))
          ) : (
            <div className={styles.noDataBox}>일정이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTrip;
