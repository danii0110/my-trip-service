import styles from './TransportModal.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TransportModal = ({ show, onHide }) => {
  const navigate = useNavigate();
  const [selectedTransport, setSelectedTransport] = useState('public');

  const goToAP2 = () => {
    onHide();
    // navigate('/planning/areaName');
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
              className={`${styles.transportBtn} ${selectedTransport === 'public' ? styles.selected : ''}`}
              type='button'
              onClick={() => handleTransportClick('public')}
            >
              대중교통
            </button>
            <button
              className={`${styles.transportBtn} ${selectedTransport === 'car' ? styles.selected : ''}`}
              type='button'
              onClick={() => handleTransportClick('car')}
            >
              승용차
            </button>
          </div>
          <div className={styles.btns}>
            <button className={styles.cancleBtn} type='button' onClick={onHide}>
              닫기
            </button>
            <button className={styles.makePlanBtn} type='button'>
              일정생성
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default TransportModal;
