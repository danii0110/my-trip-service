import styles from './AP2Main.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AP2Left from './AP2Left';
import { Button } from 'react-bootstrap';
import AP3Left from '../AP3_placePicker/AP3Left';
import AP4Left from '../AP4_hotelPicker/AP4Left';
import React, { useState } from 'react';
import DatePickerModal from './DatePicker/DatePickerModal';
import KakakoMap from '../../../modules/api/KakaoMap/KakaoMap';
import PlaceModalBox from '../AP3_placePicker/PlaceModal/PlaceModalBox';
import { useNavigate, useLocation } from 'react-router-dom';
import HotelModalBox from '../AP4_hotelPicker/HotelModal/HotelModalBox';
import ConfirmModal from '../AP4_hotelPicker/ConfirmModal/ConfirmModal';

const AP2Main = () => {
  const [showDatePickerModal, setShowDatePickerModal] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 확인 모달 상태
  const [currentLeftComponent, setCurrentLeftComponent] = useState(<AP2Left />);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedRegion, selectedArea } = location.state || {};

  // 지역 코드와 지역명을 매핑하는 객체
  const regionMap = {
    0: '서울',
    1: '부산',
    2: '대구',
    3: '인천',
    4: '광주',
    5: '대전',
    6: '울산',
    7: '세종',
    8: '경기',
    9: '강원',
    10: '충북',
    11: '충남',
    12: '전북',
    13: '전남',
    14: '경북',
    15: '경남',
    16: '제주',
  };

  const handleNextButtonClick = () => {
    if (currentLeftComponent.type === AP4Left) {
      setShowConfirmModal(true); // 확인 모달을 표시
      return;
    }

    switch (currentLeftComponent.type) {
      case AP2Left:
        setCurrentLeftComponent(<AP3Left regionMap={regionMap} />);
        break;
      case AP3Left:
        setCurrentLeftComponent(<AP4Left regionMap={regionMap} />);
        break;
      default:
        setCurrentLeftComponent(<AP2Left regionMap={regionMap} />);
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
        return <KakakoMap selectedRegion={selectedRegion} selectedArea={selectedArea} regionMap={regionMap} />;
      case AP3Left:
        return (
          <>
            <PlaceModalBox />
            <KakakoMap selectedRegion={selectedRegion} selectedArea={selectedArea} regionMap={regionMap} />
          </>
        );
      case AP4Left:
        return (
          <>
            <HotelModalBox />
            <KakakoMap selectedRegion={selectedRegion} selectedArea={selectedArea} regionMap={regionMap} />
          </>
        );
      default:
        return <KakakoMap selectedRegion={selectedRegion} selectedArea={selectedArea} regionMap={regionMap} />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftCont}>
        {React.cloneElement(currentLeftComponent, { regionMap })}
        {renderNextButton()}
      </div>
      <div className={styles.rightCont}>{renderRightComponent()}</div>
      <DatePickerModal show={showDatePickerModal} onHide={() => setShowDatePickerModal(false)} />
      <ConfirmModal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} onConfirm={handleConfirm} />
    </div>
  );
};

export default AP2Main;
