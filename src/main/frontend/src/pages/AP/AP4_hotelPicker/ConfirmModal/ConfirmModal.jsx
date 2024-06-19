import styles from './ConfirmModal.module.scss';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ConfirmModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Body className={styles.container}>
        <div className={styles.explain}>여행 계획을 저장하시겠습니까?</div>
        <button className={styles.confirmBtn} onClick={onConfirm}>
          확인
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;
