import styles from './TransportModal.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const TransportModal = ({ show, onHide }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDates, selectedRegion, selectedArea, tableData, selectedPlaces, selectedHotels, userId } =
    location.state || {};

  const [selectedTransport, setSelectedTransport] = useState('PUBLIC_TRANSPORT');

  const goToAP6 = async () => {
    const planData = {
      userId: userId, // Ensure userId is set correctly
      title: `${regionMap[selectedRegion]} ${selectedArea} 여행`,
      region: `${regionMap[selectedRegion]} ${selectedArea}`,
      startDate: selectedDates.start.toISOString().split('T')[0],
      endDate: selectedDates.end.toISOString().split('T')[0],
      transportation: selectedTransport,
      planType: 'TRAVEL_PLAN',
      dailySchedules: Object.keys(selectedPlaces).map((date) => ({
        date: new Date(date).toISOString().split('T')[0],
        schedulePlaces: selectedPlaces[date].map((place) => ({
          placeId: place.contentid,
          place: {
            name: place.title,
            address: place.addr1,
            category: place.cat1,
            image: place.firstimage,
            xCoordinate: place.mapx,
            yCoordinate: place.mapy,
          },
          duration: 60, // Default duration
          startTime: null,
          endTime: null,
        })),
      })),
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
