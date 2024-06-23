import axios from 'axios';
import { useSelector } from 'react-redux';
import HotelCont from './HotelCont';
import styles from './PlanCont.module.scss';
import { useState, useEffect } from 'react';
import TransportModal from './TransportModal';
import PickedPlaceCont from './PickedPlaceCont';
import regionMap from '../../../modules/utils/regionMap';

const categoryMap = {
  12: 'TOURIST_SPOT',
  39: 'RESTAURANT',
  14: 'CULTURAL_FACILITY',
  28: 'LEISURE_SPORTS',
  38: 'SHOPPING',
  32: 'ACCOMMODATION',
};

const PlanCont = ({ selectedDates, selectedRegion, selectedArea, selectedPlaces = {}, selectedHotels = [] }) => {
  const userFromRedux = useSelector((state) => state.user.user); // Redux 상태에서 user 정보를 가져옴
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Redux 상태에서 user 정보를 가져와 설정
    if (userFromRedux && userFromRedux.id) {
      setUserId(userFromRedux.id);
    } else {
      // Redux 상태에서 user 정보를 가져오지 못하는 경우 로컬 스토리지에서 가져옴
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, [userFromRedux]);

  const [showModal, setShowModal] = useState(false);

  const formattedDuration = `${selectedDates.start.toLocaleDateString()} - ${selectedDates.end.toLocaleDateString()}`;
  const regionName = regionMap[selectedRegion] || '없음';
  const tripName = `${regionName} ${selectedArea} 여행`;

  const generateDateRange = (start, end) => {
    const dateArray = [];
    let currentDate = new Date(start);

    while (currentDate <= new Date(end)) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  const dateRange = generateDateRange(selectedDates.start, selectedDates.end);

  const formatDateForAPI = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 1월은 0부터 시작하므로 +1
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // 날짜 형식을 YYYY-MM-DD로 수정
  };

  const formatDateForDisplay = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 1월은 0부터 시작하므로 +1
    const day = date.getDate();
    return `${year}. ${month}. ${day}.`; // 날짜 형식을 YYYY. M. D.로 수정
  };

  const handleAddToCart = async () => {
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    const cartData = {
      userId: userId,
      title: tripName,
      region: `${regionName} ${selectedArea}`,
      startDate: selectedDates.start.toISOString().split('T')[0],
      endDate: selectedDates.end.toISOString().split('T')[0],
      transportation: null,
      planType: 'CART',
      dailySchedules: dateRange.map((date) => {
        const formattedDate = formatDateForAPI(date);
        const displayDate = formatDateForDisplay(date);
        const placesForDay = selectedPlaces[displayDate] || [];
        return {
          date: formattedDate,
          schedulePlaces: placesForDay.map((place) => {
            const category = categoryMap[place.contenttypeid] || 'UNKNOWN';
            return {
              placeId: place.contentid,
              place: {
                name: place.title,
                address: place.addr1,
                category: category,
                image: place.firstimage,
                xCoordinate: place.mapx,
                yCoordinate: place.mapy,
              },
              duration: place.duration,
              startTime: place.startTime || null,
              endTime: place.endTime || null,
            };
          }),
        };
      }),
    };

    console.log('Cart Data: ', cartData);

    try {
      const response = await axios.post('http://localhost:8080/api/plans/cart', cartData);
      console.log('Plan added to cart:', response.data);
    } catch (error) {
      console.error('Error adding plan to cart:', error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tripNameCont}>
          <div className={styles.tripName}>{tripName}</div>
        </div>
        <div className={styles.durationCont}>
          <div className={styles.duration}>{formattedDuration}</div>
        </div>
        <div className={styles.pickedPlaceCont}>
          <div className={styles.pickedPlaceTextCont}>
            <div className={styles.pickedPlace}>선택한 장소</div>
          </div>
          {dateRange.map((date, index) => {
            const formattedDateForDisplay = formatDateForDisplay(date);
            const placesForDay = selectedPlaces[formattedDateForDisplay] || []; // 기본값 빈 배열
            console.log(`Formatted Date: ${formattedDateForDisplay}`);
            console.log(`Places for ${formattedDateForDisplay}:`, placesForDay);
            return <PickedPlaceCont key={index} pickedDay={formattedDateForDisplay} places={placesForDay} />;
          })}
        </div>
        <div className={styles.pickedHotelCont}>
          <div className={styles.pickedHotelTextCont}>
            <div className={styles.pickedHotel}>선택한 숙소</div>
          </div>
          <div className={styles.HotelImgCont}>
            {selectedHotels.map((hotel, index) => (
              <HotelCont
                key={index}
                day={`Day ${index + 1}`} // Day1, Day2 등으로 표시
                hotelName={hotel.name}
                hotelImage={hotel.image}
              />
            ))}
          </div>
        </div>
        <div className={styles.btnsCont}>
          <button className={styles.addCartBtn} type='button' onClick={handleAddToCart}>
            장바구니에 추가
          </button>
          <button className={styles.makePlanBtn} type='button' onClick={() => setShowModal(true)}>
            일정 생성하기 &gt;
          </button>
        </div>
      </div>
      <TransportModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};

export default PlanCont;
