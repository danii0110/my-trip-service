import { useState } from 'react';
import styles from './HotelDatePickModal.module.scss';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import XIcon from '../../../../assets/xIcon.svg';
import HotelCont from './HotelCont';

const HotelDatePickModal = ({ show, onHide, onConfirm }) => {
  const [hotelData, setHotelData] = useState([
    { date: '4.27', name: '호텔 선택' },
    { date: '4.28', name: '호텔 선택' },
    { date: '4.29', name: '호텔 선택' },
    { date: '4.30', name: '호텔 선택' },
    { date: '5.01', name: '호텔 선택' },
  ]);

  return (
    <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Body className={styles.container}>
        <img className={styles.xIcon} src={XIcon} alt='x-icon' onClick={onHide} />
        <div className={styles.main}>
          <div className={styles.explain}>숙박하실 날짜를 선택해주세요.</div>
          <div className={styles.hotelName}>롯데 호텔 제주</div>
          <div className={styles.hotelsCont}>
            {hotelData.slice(0, 5).map((hotel, index) => (
              <HotelCont key={index} date={hotel.date} hotelName={hotel.name} />
            ))}
          </div>
          <div className={styles.btnsCont}>
            <button className={styles.btn}>전체 선택</button>
            <button className={styles.btn} onClick={onConfirm}>
              완료
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default HotelDatePickModal;
