import { useState } from 'react';
import styles from './DatePickerModal.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Calendar from './Calendar';

const DatePickerModal = ({ show, onHide }) => {
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });

  const goToDatePicker = () => {
    if (selectedDates.start && selectedDates.end) {
      onHide(selectedDates); // 선택한 날짜를 넘겨줌
    } else {
      alert('날짜를 선택해주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <Modal
        show={show}
        onHide={() => onHide(selectedDates)}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Body className={styles.customModalBody}>
          <div className={styles.title}>여행할 지역을 설정하세요.</div>
          <div className={styles.subCont}>
            <p>여행 일자는 '최대 5일'까지 설정 가능합니다.</p>
            <p>여행 기간(여행지 도착 날짜, 여행지 출발 날짜)으로 입력해 주세요.</p>
          </div>
          <div className={styles.mainCont}>
            <Calendar setSelectedDates={setSelectedDates} />
          </div>
          <Button
            id={styles.nextBtn}
            className={styles.nextBtn}
            onClick={goToDatePicker}
            disabled={!selectedDates.start || !selectedDates.end} // 날짜가 선택되지 않으면 버튼 비활성화
          >
            다음 &gt;
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DatePickerModal;
