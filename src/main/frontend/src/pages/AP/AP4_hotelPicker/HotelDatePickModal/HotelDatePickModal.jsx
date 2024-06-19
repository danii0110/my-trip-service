import { useState, useEffect } from 'react';
import styles from './HotelDatePickModal.module.scss';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import XIcon from '../../../../assets/xIcon.svg';
import HotelCont from './HotelCont';

const HotelDatePickModal = ({ show, onHide, onConfirm, selectedDates, hotelName }) => {
  const [hotelData, setHotelData] = useState([]);
  const [selectedHotels, setSelectedHotels] = useState([]);

  useEffect(() => {
    if (selectedDates.start && selectedDates.end) {
      const startDate = new Date(selectedDates.start);
      const endDate = new Date(selectedDates.end);
      const dataList = [];

      for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
        dataList.push({
          date: `${d.getMonth() + 1}.${d.getDate()}`,
          name: '호텔 선택',
        });
      }

      setHotelData(dataList);
    }
  }, [selectedDates]);

  const handleHotelSelect = (index) => {
    const updatedHotels = [...selectedHotels];
    if (updatedHotels.includes(index)) {
      updatedHotels.splice(updatedHotels.indexOf(index), 1);
    } else {
      updatedHotels.push(index);
    }
    setSelectedHotels(updatedHotels);
  };

  const handleConfirm = () => {
    onConfirm(selectedHotels);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Body className={styles.container}>
        <img className={styles.xIcon} src={XIcon} alt='x-icon' onClick={onHide} />
        <div className={styles.main}>
          <div className={styles.explain}>숙박하실 날짜를 선택해주세요.</div>
          <div className={styles.hotelName}>{hotelName}</div>
          <div className={styles.hotelsCont}>
            {hotelData.map((hotel, index) => (
              <HotelCont
                key={index}
                date={hotel.date}
                hotelName={hotel.name}
                isSelected={selectedHotels.includes(index)}
                onSelect={() => handleHotelSelect(index)}
              />
            ))}
          </div>
          <div className={styles.btnsCont}>
            <button className={styles.btn} onClick={handleConfirm}>
              완료
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default HotelDatePickModal;
