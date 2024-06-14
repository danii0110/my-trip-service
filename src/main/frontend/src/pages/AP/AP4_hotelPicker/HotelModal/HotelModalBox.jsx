import styles from './HotelModalBox.module.scss';
import HotelModal from './HotelModal';

const HotelModalBox = () => {
  return (
    <div className={styles.container}>
      <HotelModal />
    </div>
  );
};

export default HotelModalBox;
