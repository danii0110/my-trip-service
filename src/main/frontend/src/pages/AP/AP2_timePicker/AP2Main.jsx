import styles from './AP2Main.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AP2Left from './AP2Left';
import { Button } from 'react-bootstrap';
import AP3Left from '../AP3_placePicker/AP3Left';
import AP4Left from '../AP4_hotelPicker/AP4Left';
import { useState } from 'react';
import ShowPlacePicker from '../AP3_placePicker/ShowPlacePicker';
import DatePickerModal from './DatePicker/DatePickerModal';
import KakakoMap from '../../../modules/api/KakaoMap/KakaoMap';
import PlaceModal from '../AP3_placePicker/PlaceModal/PlaceModalBox';
import PlaceModalBox from '../AP3_placePicker/PlaceModal/PlaceModalBox';
import { useNavigate } from 'react-router-dom';

const AP2Main = () => {
  const [showDatePickerModal, setShowDatePickerModal] = useState(true);
  const [currentLeftComponent, setCurrentLeftComponent] = useState(<AP2Left />);
  const navigate = useNavigate();
  // const [showPlacePicker, setShowPlacePicker] = useState(false);

  // ShowPlacePicker 표시 상태를 토글하는 함수
  // const toggleShowPlacePicker = () => {
  //   setShowPlacePicker(!showPlacePicker);
  // };

  const handleNextButtonClick = () => {
    switch (currentLeftComponent.type) {
      case AP2Left:
        setCurrentLeftComponent(
          // <AP4Left showPlacePicker={showPlacePicker} toggleShowPlacePicker={toggleShowPlacePicker} />
          <AP3Left />
        );
        break;
      case AP3Left:
        setCurrentLeftComponent(<AP4Left />);
        break;
      case AP4Left:
        navigate('/plan-list/areaName');
        break;
      default:
        setCurrentLeftComponent(<AP2Left />);
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
      <div className={styles.rightCont}>
        <PlaceModalBox />
        <KakakoMap />
      </div>
      <DatePickerModal show={showDatePickerModal} onHide={() => setShowDatePickerModal(false)} />
    </div>
  );
};
export default AP2Main;
