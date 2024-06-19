import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import styles from './DeleteScrapModal.module.scss';

const DeleteScrapModal = ({ show, onHide, onDelete }) => {
  return (
    <Modal show={show} onHide={onHide} size='md' aria-labelledby='contained-modal-title-vcenter' centered>
      <div className={styles.container}>
        <div className={styles.content}>삭제하시겠습니까?</div>
        <div className={styles.btnCont}>
          <button className={styles.cancelBtn} onClick={onHide}>
            취소
          </button>
          <button className={styles.deleteBtn} onClick={onDelete}>
            삭제
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteScrapModal;
