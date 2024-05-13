import styles from './AP3Main.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AP3Left from './AP3Left';
import { Button } from 'react-bootstrap';
import AP4Left from '../AP4_placePicker/AP4Left';
import AP5Left from '../AP5_hotelPicker/AP5Left';
import { useState } from 'react';
import ShowPlacePicker from '../AP4_placePicker/ShowPlacePicker';

const AP3Main = () => {
  const [currentLeftComponent, setCurrentLeftComponent] = useState(<AP3Left />);
  // const [showPlacePicker, setShowPlacePicker] = useState(false);

  // ShowPlacePicker 표시 상태를 토글하는 함수
  // const toggleShowPlacePicker = () => {
  //   setShowPlacePicker(!showPlacePicker);
  // };

  const handleNextButtonClick = () => {
    switch (currentLeftComponent.type) {
      case AP3Left:
        setCurrentLeftComponent(
          // <AP4Left showPlacePicker={showPlacePicker} toggleShowPlacePicker={toggleShowPlacePicker} />
          <AP4Left />
        );
        break;
      case AP4Left:
        setCurrentLeftComponent(<AP5Left />);
        break;
      default:
        setCurrentLeftComponent(<AP3Left />);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftCont}>
        {currentLeftComponent}
        <Button id={styles.nextBtn} onClick={handleNextButtonClick}>
          다음 &gt;
        </Button>
      </div>
      {/* {showPlacePicker && <ShowPlacePicker showPlacePicker={showPlacePicker} />} */}
      <div className={styles.rightCont}>Map</div>
    </div>
  );
};
export default AP3Main;
