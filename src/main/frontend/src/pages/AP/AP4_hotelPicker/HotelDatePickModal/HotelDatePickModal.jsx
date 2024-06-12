import styles from './HotelDatePickModal.module.scss';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HotelDatePickModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Body className={styles.container}>모달창!</Modal.Body>
    </Modal>
  );
};

export default HotelDatePickModal;
