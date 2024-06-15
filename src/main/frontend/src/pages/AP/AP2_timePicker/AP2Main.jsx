import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styles from './AP2Main.module.scss';
import AP2Left from './AP2Left';
import AP3Left from '../AP3_placePicker/AP3Left';
import AP4Left from '../AP4_hotelPicker/AP4Left';
import DatePickerModal from './DatePicker/DatePickerModal';
import KakakoMap from '../../../modules/api/KakaoMap/KakaoMap';
import PlaceModalBox from '../AP3_placePicker/PlaceModal/PlaceModalBox';
import HotelModalBox from '../AP4_hotelPicker/HotelModal/HotelModalBox';
import ConfirmModal from '../AP4_hotelPicker/ConfirmModal/ConfirmModal';
import LeftArrowIcon from '../../../assets/leftArrow.svg';
import RightArrowIcon from '../../../assets/rightArrow.svg';

const AP2Main = () => {
  const [showDatePickerModal, setShowDatePickerModal] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentLeftComponent, setCurrentLeftComponent] = useState(<AP2Left />);
  const [isPlaceModalVisible, setIsPlaceModalVisible] = useState(false);
  const [isHotelModalVisible, setIsHotelModalVisible] = useState(false);
  const [isLeftArrow, setIsLeftArrow] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};

  const [selectedDates, setSelectedDates] = useState(initialState.selectedDates || { start: null, end: null });
  const [selectedRegion, setSelectedRegion] = useState(initialState.selectedRegion);
  const [selectedArea, setSelectedArea] = useState(initialState.selectedArea);
  const [tableData, setTableData] = useState([]);

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
      setShowConfirmModal(true);
      return;
    }

    switch (currentLeftComponent.type) {
      case AP2Left:
        setCurrentLeftComponent(
          <AP3Left
            regionMap={regionMap}
            selectedDates={selectedDates}
            selectedRegion={selectedRegion}
            selectedArea={selectedArea}
            tableData={tableData}
          />
        );
        break;
      case AP3Left:
        setCurrentLeftComponent(<AP4Left regionMap={regionMap} />);
        break;
      default:
        setCurrentLeftComponent(<AP2Left regionMap={regionMap} />);
    }
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    navigate('/plan-list/areaName', {
      state: {
        selectedDates,
        selectedRegion,
        selectedArea,
        tableData,
      },
    });
  };

  const handleClick = () => {
    setIsLeftArrow(!isLeftArrow);
    setIsPlaceModalVisible(!isPlaceModalVisible);
  };

  const handleHotelClick = () => {
    setIsHotelModalVisible(!isHotelModalVisible);
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
    return (
      <div className={styles.rightContentWrapper}>
        {isPlaceModalVisible && currentLeftComponent.type === AP3Left && (
          <PlaceModalBox selectedDates={selectedDates} />
        )}
        {isHotelModalVisible && currentLeftComponent.type === AP4Left && <HotelModalBox />}
        <div className={styles.buttonContainer}>
          {currentLeftComponent.type === AP3Left && (
            <Button className={styles.modalBtn} onClick={handleClick}>
              <img
                className={styles.arrowIcon}
                src={isLeftArrow ? LeftArrowIcon : RightArrowIcon}
                alt={isLeftArrow ? 'left-arrow-icon' : 'right-arrow-icon'}
              />
            </Button>
          )}
          {currentLeftComponent.type === AP4Left && (
            <Button className={styles.modalBtn} onClick={handleHotelClick}>
              <img
                className={styles.arrowIcon}
                src={isHotelModalVisible ? LeftArrowIcon : RightArrowIcon}
                alt={isHotelModalVisible ? 'left-arrow-icon' : 'right-arrow-icon'}
              />
            </Button>
          )}
        </div>
        <KakakoMap selectedRegion={selectedRegion} selectedArea={selectedArea} regionMap={regionMap} />
      </div>
    );
  };

  const handleCloseDatePicker = (data) => {
    console.log('handleCloseDatePicker calling with:', data);
    setShowDatePickerModal(false);
    if (data.selectedDates.start && data.selectedDates.end) {
      setSelectedDates(data.selectedDates);
      setSelectedRegion(data.selectedRegion);
      setSelectedArea(data.selectedArea);
      setTableData([]); // 새로 날짜를 선택하면 tableData를 초기화
      navigate('/planning/areaName', {
        state: {
          selectedDates: data.selectedDates,
          selectedRegion: data.selectedRegion,
          selectedArea: data.selectedArea,
        },
      });
    } else {
      setShowDatePickerModal(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftCont}>
        {React.cloneElement(currentLeftComponent, {
          regionMap,
          selectedDates,
          selectedRegion,
          selectedArea,
          tableData,
          onTableDataChange: setTableData, // 테이블 데이터 변경 핸들러
          openDatePickerModal: () => setShowDatePickerModal(true),
        })}
        {renderNextButton()}
      </div>
      <div className={styles.rightCont}>{renderRightComponent()}</div>
      <DatePickerModal show={showDatePickerModal} onHide={handleCloseDatePicker} />
      <ConfirmModal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} onConfirm={handleConfirm} />
    </div>
  );
};

export default AP2Main;
