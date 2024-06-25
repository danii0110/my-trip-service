import styles from './AP5Main.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionIcon from '../../../assets/questionIcon.svg';
import UpArrowIcon from '../../../assets/upArrowIcon.svg';
import DownArrowIcon from '../../../assets/downArrowIcon.svg';
import KakakoMap from '../../../modules/api/KakaoMap/KakaoMap';
import { useState, useEffect } from 'react';
import PlanCont from './PlanCont';
import CartModal from './CartModal';
import regionMap from '../../../modules/utils/regionMap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AP5Main = () => {
  const location = useLocation();
  const { selectedDates, selectedRegion, selectedArea, tableData, selectedPlaces, selectedHotels } =
    location.state || {};
  const [userId, setUserId] = useState(null);
  const [cartPlans, setCartPlans] = useState([]);
  const [isUpArrow, setIsUpArrow] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.log('No User ID found in localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchCartPlans = async () => {
      if (userId) {
        console.log(`Fetching cart plans for user ID: ${userId}, region: ${selectedRegion}, area: ${selectedArea}`);
        try {
          const response = await axios.get(`/api/plans/cart/${userId}`);
          const filteredPlans = response.data.filter((plan) => plan.planType === 'CART');

          // endDate와 startDate가 문자열인지 확인하고, 문자열이 아니면 변환
          const transformedPlans = filteredPlans.map((plan) => ({
            ...plan,
            endDate: typeof plan.endDate === 'string' ? plan.endDate : plan.endDate.toString(),
            startDate: typeof plan.startDate === 'string' ? plan.startDate : plan.startDate.toString(),
          }));

          setCartPlans(transformedPlans);
          console.log('API Response:', response.data);
          console.log('Filtered Plans:', transformedPlans);
        } catch (error) {
          console.error('Error fetching cart plans:', error);
        }
      }
    };

    fetchCartPlans();
  }, [userId]);

  const handleRemove = async (planId) => {
    try {
      await axios.delete(`/api/plans/${planId}`);
      setCartPlans(cartPlans.filter((plan) => plan.planId !== planId));
    } catch (error) {
      console.error('Error removing plan:', error);
    }
  };

  const handleClick = () => {
    setShowModal(!showModal);
    setIsUpArrow(!isUpArrow);
  };

  const calculatePlaceCount = (dailySchedules = []) => {
    return dailySchedules.reduce((count, schedule) => count + schedule.schedulePlaces.length, 0);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftCont}>
          <div className={styles.cart}>
            <div className={styles.title}>나의 여행 장바구니</div>
            <button className={styles.questionIcon}>
              <img src={QuestionIcon} alt='question-icon' />
              <div className={styles.tooltip}>
                AI 일정 최적화 전에 설정한 일자와 선택한 숙소, 장소들을 중간 저장해 놓은 목록입니다.
              </div>
            </button>
            <button onClick={handleClick}>
              <img
                className={styles.arrowIcon}
                src={isUpArrow ? UpArrowIcon : DownArrowIcon}
                alt={isUpArrow ? 'up-arrow-icon' : 'down-arrow-icon'}
              />
            </button>
          </div>
          {showModal && (
            <div className={styles.modalContainer}>
              {cartPlans.map((plan, index) => {
                const placeCount = calculatePlaceCount(plan.dailySchedules);
                console.log('Plan:', plan);
                console.log('Place Count:', placeCount);
                return (
                  <CartModal
                    key={plan.planId}
                    content={{
                      editDate: plan.endDate.split('-').join('. '), // YYYY-MM-DD 형식을 YYYY. MM. DD 형식으로 변환
                      duration: `${plan.startDate.split('-').join('. ')} - ${plan.endDate.split('-').join('. ')}`, // 날짜 형식을 YYYY. MM. DD - YYYY. MM. DD로 변환
                      places: [`${plan.region}${index + 1}`],
                      placeCount: placeCount,
                    }}
                    onRemove={() => handleRemove(plan.planId)}
                  />
                );
              })}
            </div>
          )}
          <div className={styles.planCont}>
            <PlanCont
              selectedDates={selectedDates}
              selectedRegion={selectedRegion}
              selectedArea={selectedArea}
              selectedPlaces={selectedPlaces}
              selectedHotels={selectedHotels}
              userId={userId}
            />
          </div>
          {/* <div className={styles.divToCheck}>
            <h3>전달된 데이터 확인:</h3>
            <p>
              Region: {selectedRegion !== undefined && selectedRegion !== null ? regionMap[selectedRegion] : '없음'}
            </p>
            <p>Area: {selectedArea}</p>
            <p>Start Date: {selectedDates.start ? selectedDates.start.toLocaleDateString() : '없음'}</p>
            <p>End Date: {selectedDates.end ? selectedDates.end.toLocaleDateString() : '없음'}</p>
            <p>Table Data: {JSON.stringify(tableData)}</p>
            <p>
              Selected Places:{' '}
              {Object.keys(selectedPlaces).map((date) => (
                <div key={date}>
                  <strong>{date}:</strong>
                  {selectedPlaces[date].map((place, index) => (
                    <div key={index}>
                      {place.title} - Duration: {place.duration}분<div>Address: {place.addr1}</div>
                      <div>Category: {place.category}</div>
                      <div>Image: {place.firstimage}</div>
                      <div>X Coordinate: {place.mapx}</div>
                      <div>Y Coordinate: {place.mapy}</div>
                    </div>
                  ))}
                </div>
              ))}
            </p>
            <p>
              Selected Hotels:
              {selectedHotels.map((hotel, index) => (
                <div key={index}>
                  <strong>{hotel.date}:</strong>
                  <div>Name: {hotel.name}</div>
                  <div>Address: {hotel.address}</div>
                  <div>Image: {hotel.image}</div>
                  <div>X Coordinate: {hotel.xCoordinate}</div>
                  <div>Y Coordinate: {hotel.yCoordinate}</div>
                </div>
              ))}
            </p>
            <p>User ID: {userId}</p>
          </div> */}
        </div>
        <div className={styles.rightCont}>
          <KakakoMap selectedRegion={selectedRegion} selectedArea={selectedArea} regionMap={regionMap} />
        </div>
      </div>
    </>
  );
};

export default AP5Main;
