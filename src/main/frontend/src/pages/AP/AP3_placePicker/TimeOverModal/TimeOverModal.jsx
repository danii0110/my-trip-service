import styles from './TimeOverModal.module.scss';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TimeOverModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Body className={styles.container}>
        <div className={styles.explain}>여행의 총 시간보다 장소의 총 시간이 클 수 없습니다.</div>
        <button className={styles.confirmBtn} onClick={onConfirm}>
          확인
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default TimeOverModal;
