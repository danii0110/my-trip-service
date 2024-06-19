import React from 'react';
import HotelModal from './HotelModal';
import styles from './HotelModalBox.module.scss';

const HotelModalBox = ({ selectedDates }) => {
  return (
    <div className={styles.container}>
      <HotelModal selectedDates={selectedDates} />
    </div>
  );
};

export default HotelModalBox;
