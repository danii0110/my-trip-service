import { useState, useEffect } from 'react';
import styles from './DatePickerModal.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Calendar from './Calendar';
import { useLocation, useNavigate } from 'react-router-dom';

const DatePickerModal = ({ show, onHide }) => {
  const location = useLocation();
  const { selectedRegion, selectedArea } = location.state || {};
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });
  const navigate = useNavigate();

  useEffect(() => {
    console.log('DatePickerModal loaded with:', {
      selectedRegion,
      selectedArea,
      selectedDates,
    });
  }, [selectedRegion, selectedArea, selectedDates]);

  const goToDatePicker = () => {
    console.log('Selected dates before onHide:', selectedDates);
    if (selectedDates.start && selectedDates.end) {
      onHide({ selectedDates, selectedRegion, selectedArea });
      navigate('/planning/areaName', {
        state: { selectedDates, selectedRegion, selectedArea },
      });
    } else {
      alert('날짜를 선택해주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <Modal
        show={show}
        onHide={() => {
          onHide({ selectedDates, selectedRegion, selectedArea });
          navigate('/planning/areaName', {
            state: { selectedDates, selectedRegion, selectedArea },
          });
        }}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Body className={styles.customModalBody}>
          <div className={styles.title}>여행할 날짜를 설정하세요.</div>
          <div className={styles.subCont}>
            <p>여행 일자는 '최대 5일'까지 설정 가능합니다.</p>
            <p>여행 기간(여행지 도착 날짜, 여행지 출발 날짜)으로 입력해 주세요.</p>
          </div>
          <div className={styles.mainCont}>
            <Calendar
              setSelectedDates={(dates) => {
                console.log('Dates selected in Calendar:', dates);
                setSelectedDates(dates);
              }}
            />
          </div>
          <Button
            id={styles.nextBtn}
            className={styles.nextBtn}
            onClick={goToDatePicker}
            disabled={!selectedDates.start || !selectedDates.end}
          >
            다음 &gt;
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DatePickerModal;
