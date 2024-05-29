import styles from './GoMyTripModal.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GoMyTripModal = ({ show, onHide }) => {
  const navigate = useNavigate();
  const cancleonClick = () => {
    onHide();
  };

  const goToMyTrip = () => {
    onHide();
    navigate('/my-trip');
  };
  return (
    <div className={styles.container}>
      <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Body className={styles.customModalBody}>
          <div className={styles.content}>
            <p>저장되었습니다.</p>
            <p>마이페이지로 이동하시겠습니까?</p>
          </div>
          <div className={styles.btnCont}>
            <button className={styles.cancleBtn} type='button' onClick={cancleonClick}>
              닫기
            </button>
            <button className={styles.okBtn} type='button' onClick={goToMyTrip}>
              확인
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default GoMyTripModal;
