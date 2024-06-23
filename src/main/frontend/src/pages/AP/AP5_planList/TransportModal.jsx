import { useSelector } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import regionMap from '../../../modules/utils/regionMap';
import styles from './TransportModal.module.scss';

const categoryMap = {
  12: 'TOURIST_SPOT',
  39: 'RESTAURANT',
  14: 'CULTURAL_FACILITY',
  28: 'LEISURE_SPORTS',
  38: 'SHOPPING',
  32: 'ACCOMMODATION',
};

const TransportModal = ({ show, onHide }) => {
  const user = useSelector((state) => state.user.user); // Redux에서 user 정보를 가져옴
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDates, selectedRegion, selectedArea, tableData, selectedPlaces, selectedHotels } =
    location.state || {};

  const [selectedTransport, setSelectedTransport] = useState('PUBLIC_TRANSPORT');

  useEffect(() => {
    console.log('User in TransportModal:', user);
  }, [user]);

  const goToAP6 = async () => {
    if (!user) {
      console.error('User not logged in');
      return;
    }

    const planData = {
      userId: user.id,
      title: `${regionMap[selectedRegion] || 'unknown'} ${selectedArea || 'unknown'} 여행`,
      region: `${regionMap[selectedRegion] || 'unknown'} ${selectedArea || 'unknown'}`,
      startDate: selectedDates.start.toISOString().split('T')[0],
      endDate: selectedDates.end.toISOString().split('T')[0],
      transportation: selectedTransport,
      planType: 'TRAVEL_PLAN',
      dailySchedules: Object.keys(selectedPlaces)
        .map((date) => ({
          date: new Date(date).toISOString().split('T')[0],
          schedulePlaces: selectedPlaces[date].map((place) => {
            const category = categoryMap[place.contenttypeid] || 'UNKNOWN';
            return {
              placeId: parseInt(place.contentid, 10), // placeId를 숫자로 변환
              place: {
                name: place.title,
                address: place.addr1,
                category: category,
                image: place.firstimage,
                xCoordinate: place.mapx,
                yCoordinate: place.mapy,
              },
              duration: place.duration || 60,
              startTime: place.startTime || null,
              endTime: place.endTime || null,
            };
          }),
        }))
        .concat(
          selectedHotels.map((hotel, index) => ({
            date: new Date(
              selectedDates.start.getFullYear(),
              selectedDates.start.getMonth(),
              selectedDates.start.getDate() + index
            )
              .toISOString()
              .split('T')[0],
            schedulePlaces: [
              {
                placeId: user.id + index, // placeId를 고유한 숫자 값으로 설정
                place: {
                  name: hotel.name,
                  address: hotel.address || '',
                  category: 'ACCOMMODATION',
                  image: hotel.image,
                  xCoordinate: hotel.xCoordinate || '',
                  yCoordinate: hotel.yCoordinate || '',
                },
                duration: 0,
                startTime: null,
                endTime: null,
              },
            ],
          }))
        ),
    };

    console.log('Request Data: ', planData);

    try {
      await axios.post('http://localhost:8080/api/plans/complete', planData);
      onHide();
      navigate('/itinerary/areaName', {
        state: {
          selectedDates,
          selectedRegion,
          selectedArea,
          tableData,
          selectedTransport,
        },
      });
    } catch (error) {
      console.error('Error creating plan', error);
    }
  };

  const handleTransportClick = (transport) => {
    setSelectedTransport(transport);
  };

  return (
    <div className={styles.container}>
      <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Body className={styles.customModalBody}>
          <div className={styles.title}>이동수단 선택</div>
          <div className={styles.subTitle}>여행 시 이동하실 교통수단을 선택해주세요.</div>
          <div className={styles.transportCont}>
            <button
              className={`${styles.transportBtn} ${selectedTransport === 'PUBLIC_TRANSPORT' ? styles.selected : ''}`}
              type='button'
              onClick={() => handleTransportClick('PUBLIC_TRANSPORT')}
            >
              대중교통
            </button>
            <button
              className={`${styles.transportBtn} ${selectedTransport === 'CAR' ? styles.selected : ''}`}
              type='button'
              onClick={() => handleTransportClick('CAR')}
            >
              승용차
            </button>
          </div>
          <div className={styles.btns}>
            <button className={styles.cancleBtn} type='button' onClick={onHide}>
              닫기
            </button>
            <button className={styles.makePlanBtn} type='button' onClick={goToAP6}>
              일정생성
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TransportModal;
