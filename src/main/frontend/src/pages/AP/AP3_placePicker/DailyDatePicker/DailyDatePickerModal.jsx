import { useState, useEffect } from 'react';
import styles from './DailyDatePickerModal.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import DailyCalendar from './DailyCalendar';

const DailyDatePickerModal = ({ show, onHide, startDate, endDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    console.log('DailyDatePickerModal loaded with:', {
      selectedDate,
      startDate,
      endDate,
    });
  }, [selectedDate, startDate, endDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    if (selectedDate) {
      onHide({ selectedDate });
    } else {
      alert('날짜를 선택해주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <Modal
        show={show}
        onHide={() => onHide({ selectedDate })}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Body className={styles.customModalBody}>
          <div className={styles.title}>날짜를 설정하세요.</div>
          <div className={styles.subCont}>
            <p>장소를 추가할 날짜를 설정하세요.</p>
            <p>여행 기간(여행지 도착 날짜, 여행지 출발 날짜)만 선택이 가능합니다.</p>
          </div>
          <div className={styles.mainCont}>
            <DailyCalendar startDate={startDate} endDate={endDate} onSelect={handleDateSelect} />
          </div>
          <Button id={styles.nextBtn} className={styles.nextBtn} onClick={handleConfirm} disabled={!selectedDate}>
            다음 &gt;
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DailyDatePickerModal;
