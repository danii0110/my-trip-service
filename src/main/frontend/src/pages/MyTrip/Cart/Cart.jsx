import styles from './Cart.module.scss';
import QuestionIcon from '../../../assets/questionIcon.svg';
import Plan from './Plan';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          const response = await axios.get(`/api/plans/cart/${storedUserId}`);
          const userPlans = response.data;

          // Group plans by region and area
          const groupedPlans = userPlans.reduce((acc, plan) => {
            const key = `${plan.region}`;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(plan);
            return acc;
          }, {});

          // Transform grouped plans into the required format
          const transformedPlans = Object.keys(groupedPlans).map((key) => {
            const regionPlans = groupedPlans[key];
            const areaName = regionPlans[0].region;
            const startDate = new Date(Math.min(...regionPlans.map((plan) => new Date(plan.startDate))));
            const endDate = new Date(Math.max(...regionPlans.map((plan) => new Date(plan.endDate))));
            const formattedDate = `${startDate.toLocaleDateString()}-${endDate.toLocaleDateString()}`;
            return {
              date: formattedDate,
              areaName,
              planNum: regionPlans.length,
            };
          });

          setPlans(transformedPlans);
        } else {
          console.log('No User ID found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const handleDelete = (index) => {
    // Implement the delete functionality here if needed
  };

  return (
    <div className={styles.container}>
      <div className={styles.subtitleCont}>
        <div className={styles.subtitle}>나의 여행 도시 목록</div>
        <button className={styles.questionIcon}>
          <img src={QuestionIcon} alt='question-icon' />
          <div className={styles.tooltip}>
            AI 일정 최적화 전에 설정한 일자와 선택한 숙소, 장소들을 중간 저장해 놓은 목록입니다.
          </div>
        </button>
      </div>
      <div className={styles.mainCont}>
        <div className={styles.main}>
          {plans.map((plan, index) => (
            <Plan
              key={index}
              date={plan.date}
              areaName={plan.areaName}
              planNum={plan.planNum}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
