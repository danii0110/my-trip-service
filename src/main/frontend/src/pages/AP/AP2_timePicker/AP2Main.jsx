import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styles from './AP2Main.module.scss';
import AP2Left from './AP2Left';
import AP3Left from '../AP3_placePicker/AP3Left';
import AP4Left from '../AP4_hotelPicker/AP4Left';
import DatePickerModal from './DatePicker/DatePickerModal';
import KakakoMap from '../../../modules/api/KakaoMap/KakaoMap';
import PlaceKakaoMap from '../../../modules/api/PlaceKakaoMap/PlaceKakaoMap';
import PlaceModalBox from '../AP3_placePicker/PlaceModal/PlaceModalBox';
import HotelModalBox from '../AP4_hotelPicker/HotelModal/HotelModalBox';
import ConfirmModal from '../AP4_hotelPicker/ConfirmModal/ConfirmModal';
import LeftArrowIcon from '../../../assets/leftArrow.svg';
import RightArrowIcon from '../../../assets/rightArrow.svg';
import regionMap from '../../../modules/utils/regionMap'; // regionMap import

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
  const [selectedPlaces, setSelectedPlaces] = useState({});
  const [selectedTimes, setSelectedTimes] = useState({});
  const [currentSelectedDate, setCurrentSelectedDate] = useState(
    selectedDates.start ? new Date(selectedDates.start).toLocaleDateString('ko-KR') : ''
  );

  const currentSelectedDateRef = useRef(currentSelectedDate);

  useEffect(() => {
    currentSelectedDateRef.current = currentSelectedDate;
  }, [currentSelectedDate]);

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
            selectedTimes={selectedTimes}
            selectedRegion={selectedRegion}
            selectedArea={selectedArea}
            tableData={tableData}
            onPlaceSelect={handlePlaceSelect}
            selectedPlaces={selectedPlaces}
            currentSelectedDate={currentSelectedDate}
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

  const handlePlaceSelect = (placeId, place, isSelected) => {
    setSelectedPlaces((prevPlaces) => {
      const updatedPlaces = { ...prevPlaces };
      console.log(`Place selection changed. currentSelectedDate: ${currentSelectedDateRef.current}`); // ref 사용
      if (isSelected) {
        if (!updatedPlaces[currentSelectedDateRef.current]) {
          updatedPlaces[currentSelectedDateRef.current] = [];
        }
        updatedPlaces[currentSelectedDateRef.current].push({
          ...place,
          id: placeId,
          mapX: place.mapx,
          mapY: place.mapy,
        });
        console.log(`Place added on ${currentSelectedDateRef.current}:`, updatedPlaces[currentSelectedDateRef.current]);
      } else {
        if (updatedPlaces[currentSelectedDateRef.current]) {
          updatedPlaces[currentSelectedDateRef.current] = updatedPlaces[currentSelectedDateRef.current].filter(
            (p) => p.id !== placeId
          );
          if (updatedPlaces[currentSelectedDateRef.current].length === 0) {
            delete updatedPlaces[currentSelectedDateRef.current];
          }
          console.log(
            `Place removed from ${currentSelectedDateRef.current}:`,
            updatedPlaces[currentSelectedDateRef.current]
          );
        }
      }
      return updatedPlaces;
    });
  };

  const handleTableDataChange = (newTableData) => {
    setTableData(newTableData);
    const times = {};
    newTableData.forEach((row) => {
      const date = row[0];
      times[date] = {
        start: row[2],
        end: row[3],
      };
    });
    setSelectedTimes(times);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    navigate('/plan-list/areaName', {
      state: {
        selectedDates,
        selectedTimes,
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

  const handleDateChange = (newDate) => {
    const formattedDate = new Date(newDate).toLocaleDateString('ko-KR');
    console.log(`Date changed to: ${formattedDate}`);
    setCurrentSelectedDate(formattedDate);
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
          <PlaceModalBox
            selectedDates={selectedDates}
            selectedTimes={selectedTimes}
            selectedPlaces={selectedPlaces[currentSelectedDate] || []}
            onPlaceSelect={handlePlaceSelect}
            currentSelectedDate={currentSelectedDate}
            onDateChange={handleDateChange}
          />
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
        {currentLeftComponent.type === AP3Left || currentLeftComponent.type === AP4Left ? (
          <PlaceKakaoMap selectedPlaces={selectedPlaces[currentSelectedDate] || []} />
        ) : (
          <KakakoMap selectedRegion={selectedRegion} selectedArea={selectedArea} regionMap={regionMap} />
        )}
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
      const newDate = new Date(data.selectedDates.start).toLocaleDateString('ko-KR');
      setCurrentSelectedDate(newDate);
      currentSelectedDateRef.current = newDate; // ref 업데이트
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
          onTableDataChange: handleTableDataChange,
          openDatePickerModal: () => setShowDatePickerModal(true),
          onPlaceSelect: handlePlaceSelect,
          selectedPlaces,
          currentSelectedDate,
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
