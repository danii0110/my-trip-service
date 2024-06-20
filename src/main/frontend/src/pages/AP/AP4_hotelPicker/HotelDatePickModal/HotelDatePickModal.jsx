import { useState, useEffect } from 'react';
import styles from './HotelDatePickModal.module.scss';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import XIcon from '../../../../assets/xIcon.svg';
import HotelCont from './HotelCont';

const HotelDatePickModal = ({ show, onHide, onConfirm, selectedDates, hotelName, selectedHotel }) => {
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
          image: null,
        });
      }

      setHotelData(dataList);
    }
  }, [selectedDates]);

  const handleHotelSelect = (index, hotel) => {
    const updatedHotels = [...hotelData];
    updatedHotels[index] = {
      ...updatedHotels[index],
      name: hotel.title,
      image: hotel.firstimage,
      date: hotelData[index].date, // date 값을 유지
    };

    const updatedSelectedHotels = [...selectedHotels];
    updatedSelectedHotels[index] = {
      ...updatedSelectedHotels[index],
      name: hotel.title,
      image: hotel.firstimage,
      date: hotelData[index].date, // date 값을 유지
    };

    console.log('Hotel selected in HotelDatePickModal:', updatedHotels);
    console.log('Selected Hotels in HotelDatePickModal:', updatedSelectedHotels);

    setHotelData(updatedHotels);
    setSelectedHotels(updatedSelectedHotels);
  };

  const handleConfirm = () => {
    console.log('Confirming selected hotels:', selectedHotels); // Confirm 버튼이 눌렸을 때의 로그
    if (onConfirm) {
      console.log('onConfirm 수행된다~~');
      onConfirm(selectedHotels); // selectedHotels를 부모 컴포넌트로 전달
    } else {
      console.error('onConfirm is not defined');
    }
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
                image={hotel.image}
                isSelected={selectedHotels.includes(hotel)}
                onSelect={() => handleHotelSelect(index, selectedHotel)}
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
