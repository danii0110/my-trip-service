import { Button } from 'react-bootstrap';
import HotelCont from './HotelCont';
import PlaceCont from './PlaceCont';
import styles from './PlanCont.module.scss';
import { useState } from 'react';
import TransportModal from './TransportModal';
const PlanCont = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.tripNameCont}>
          <div className={styles.tripName}>여행 이름</div>
          <div className={styles.editText}>편집</div>
        </div>
        <div className={styles.durationCont}>
          <div className={styles.duration}>24.04.25-24.04.29</div>
          <div className={styles.editText}>편집</div>
        </div>
        <div className={styles.pickedPlaceCont}>
          <div className={styles.pickedPlaceTextCont}>
            <div className={styles.pickedPlace}>선택한 장소</div>
            <div className={styles.editText}>편집</div>
          </div>
          <div className={styles.placeImgCont}>
            <PlaceCont />
            <PlaceCont />
            <PlaceCont />
            <PlaceCont />
            <PlaceCont />
            <PlaceCont />
            <PlaceCont />
          </div>
        </div>
        <div className={styles.pickedHotelCont}>
          <div className={styles.pickedHotelTextCont}>
            <div className={styles.pickedHotel}>선택한 숙소</div>
            <div className={styles.editText}>편집</div>
          </div>
          <div className={styles.HotelImgCont}>
            <HotelCont />
            <HotelCont />
            <HotelCont />
            <HotelCont />
            <HotelCont />
            <HotelCont />
            <HotelCont />
          </div>
        </div>
        <button className={styles.makePlanBtn} type='button' onClick={() => setShowModal(true)}>
          일정 생성하기 &gt;
        </button>
      </div>
      <TransportModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};
export default PlanCont;
