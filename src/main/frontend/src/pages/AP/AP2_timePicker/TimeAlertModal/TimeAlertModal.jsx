import styles from './TimeAlertModal.module.scss';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TimeAlertModal = ({ show, onHide, onConfirm, alertMessage }) => {
  return (
    <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Body className={styles.container}>
        <div className={styles.alert}>{alertMessage}</div>
        <button className={styles.confirmBtn} onClick={onConfirm}>
          확인
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default TimeAlertModal;
