import styles from './DatePickerModal.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Calendar from './Calendar';

const DatePickerModal = ({ show, onHide }) => {
  return (
    <div className={styles.container}>
      <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Body className={styles.customModalBody}>
          <div className={styles.title}>여행할 지역을 설정하세요.</div>
          <div className={styles.subCont}>
            <p>여행 일자는 '최대 5일'까지 설정 가능합니다.</p>
            <p>여행 기간(여행지 도착 날짜, 여행지 출발 날짜)으로 입력해 주세요.</p>
          </div>
          <div className={styles.mainCont}>
            <Calendar />
          </div>
          <Button id={styles.nextBtn} className={styles.nextBtn} onClick={onHide}>
            다음 &gt;
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default DatePickerModal;
