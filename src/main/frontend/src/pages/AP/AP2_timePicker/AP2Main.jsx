import styles from './AP2Main.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AP2Left from './AP2Left';
import { Button } from 'react-bootstrap';
import AP3Left from '../AP3_placePicker/AP3Left';
import AP4Left from '../AP4_hotelPicker/AP4Left';
import { useState } from 'react';
import DatePickerModal from './DatePicker/DatePickerModal';
import KakakoMap from '../../../modules/api/KakaoMap/KakaoMap';
import PlaceModalBox from '../AP3_placePicker/PlaceModal/PlaceModalBox';
import { useNavigate } from 'react-router-dom';
import HotelModalBox from '../AP4_hotelPicker/HotelModal/HotelModalBox';
import ConfirmModal from '../AP4_hotelPicker/ConfirmModal/ConfirmModal';

const AP2Main = () => {
  const [showDatePickerModal, setShowDatePickerModal] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 확인 모달 상태
  const [currentLeftComponent, setCurrentLeftComponent] = useState(<AP2Left />);
  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    if (currentLeftComponent.type === AP4Left) {
      setShowConfirmModal(true); // 확인 모달을 표시
      return;
    }

    switch (currentLeftComponent.type) {
      case AP2Left:
        setCurrentLeftComponent(<AP3Left />);
        break;
      case AP3Left:
        setCurrentLeftComponent(<AP4Left />);
        break;
      default:
        setCurrentLeftComponent(<AP2Left />);
    }
  };

  const handleConfirm = () => {
    setShowConfirmModal(false); // 확인 모달을 닫기
    navigate('/plan-list/areaName'); // 페이지 이동
  };

  const renderNextButton = () => {
    switch (currentLeftComponent.type) {
      case AP4Left:
        return (
          <Button id={styles.nextBtn} onClick={handleNextButtonClick}>
            저장 &gt;
          </Button>
        );
      default:
        return (
          <Button id={styles.nextBtn} onClick={handleNextButtonClick}>
            다음 &gt;
          </Button>
        );
    }
  };

  const renderRightComponent = () => {
    switch (currentLeftComponent.type) {
      case AP2Left:
        return <KakakoMap />;
      case AP3Left:
        return (
          <>
            <PlaceModalBox />
            <KakakoMap />
          </>
        );
      case AP4Left:
        return (
          <>
            <HotelModalBox />
            <KakakoMap />
          </>
        );
      default:
        return <KakakoMap />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftCont}>
        {currentLeftComponent}
        {renderNextButton()}
      </div>
      <div className={styles.rightCont}>{renderRightComponent()}</div>
      <DatePickerModal show={showDatePickerModal} onHide={() => setShowDatePickerModal(false)} />
      <ConfirmModal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} onConfirm={handleConfirm} />
    </div>
  );
};

export default AP2Main;
