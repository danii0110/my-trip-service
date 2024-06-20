import React from 'react';
import HotelModal from './HotelModal';
import styles from './HotelModalBox.module.scss';

const HotelModalBox = ({ selectedDates, selectedHotels }) => {
  console.log('HotelModalBox - selectedDates:', selectedDates);
  console.log('HotelModalBox - selectedHotels:', selectedHotels); // 전달된 selectedHotels 확인

  return (
    <div className={styles.container}>
      <HotelModal selectedDates={selectedDates} selectedHotels={selectedHotels} />
    </div>
  );
};

export default HotelModalBox;
