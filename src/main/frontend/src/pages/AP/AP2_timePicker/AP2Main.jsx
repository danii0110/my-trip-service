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
import regionMap from '../../../modules/utils/regionMap';
import HotelDatePickModal from '../AP4_hotelPicker/HotelDatePickModal/HotelDatePickModal';

const AP2Main = () => {
  const [showDatePickerModal, setShowDatePickerModal] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentLeftComponent, setCurrentLeftComponent] = useState(<AP2Left />);
  const [isPlaceModalVisible, setIsPlaceModalVisible] = useState(false);
  const [isHotelModalVisible, setIsHotelModalVisible] = useState(false);
  const [isHotelDatePickModalVisible, setIsHotelDatePickModalVisible] = useState(false);
  const [isLeftArrow, setIsLeftArrow] = useState(true);
  const [hotelName, setHotelName] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null); // selectedHotel 상태 추가

  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};

  const [selectedDates, setSelectedDates] = useState(initialState.selectedDates || { start: null, end: null });
  const [selectedRegion, setSelectedRegion] = useState(initialState.selectedRegion);
  const [selectedArea, setSelectedArea] = useState(initialState.selectedArea);
  const [tableData, setTableData] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState({});
  const [selectedTimes, setSelectedTimes] = useState({});
  const [selectedHotels, setSelectedHotels] = useState([]); // AP4Left에서 선택된 호텔 정보를 저장하는 상태
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
        setCurrentLeftComponent(
          <AP4Left
            regionMap={regionMap}
            selectedDates={selectedDates}
            selectedTimes={selectedTimes}
            selectedRegion={selectedRegion}
            selectedArea={selectedArea}
            tableData={tableData}
            selectedPlaces={selectedPlaces}
            currentSelectedDate={currentSelectedDate}
            openHotelModal={() => setIsHotelModalVisible(true)}
            onHotelSelect={handleHotelSelect}
            setHotelName={setHotelName}
            openHotelDatePickModal={() => setIsHotelDatePickModalVisible(true)}
            handleSelectHotels={handleSelectHotels}
          />
        );
        break;
      default:
        setCurrentLeftComponent(<AP2Left regionMap={regionMap} />);
    }
  };

  const handlePlaceSelect = (placeId, place, isSelected) => {
    setSelectedPlaces((prevPlaces) => {
      const updatedPlaces = { ...prevPlaces };
      if (isSelected) {
        if (!updatedPlaces[currentSelectedDateRef.current]) {
          updatedPlaces[currentSelectedDateRef.current] = [];
        }
        updatedPlaces[currentSelectedDateRef.current].push(place);
      } else {
        if (updatedPlaces[currentSelectedDateRef.current]) {
          updatedPlaces[currentSelectedDateRef.current] = updatedPlaces[currentSelectedDateRef.current].filter(
            (p) => p.id !== placeId
          );
          if (updatedPlaces[currentSelectedDateRef.current].length === 0) {
            delete updatedPlaces[currentSelectedDateRef.current];
          }
        }
      }
      return updatedPlaces;
    });
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotels((prevSelectedHotels) => {
      const isAlreadySelected = prevSelectedHotels.some((h) => h.contentid === hotel.contentid);
      if (isAlreadySelected) {
        return prevSelectedHotels.filter((h) => h.contentid !== hotel.contentid);
      } else {
        console.log('Adding hotel:', hotel); // 추가된 로그
        return [...prevSelectedHotels, hotel];
      }
    });
  };

  const handleSelectHotels = (selectedHotels) => {
    console.log('handleSelectHotels - Called');
    console.log('handleSelectHotels - Selected Hotels:', selectedHotels);
    setSelectedHotels(selectedHotels);
    console.log('State after setSelectedHotels:', selectedHotels); // 상태 업데이트 확인
    setIsHotelDatePickModalVisible(false);
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
        selectedPlaces,
        selectedHotels, // 선택된 호텔 정보를 함께 전달
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
        {isHotelModalVisible && currentLeftComponent.type === AP4Left && (
          <HotelModalBox selectedDates={selectedDates} selectedHotels={selectedHotels} />
        )}
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
          <PlaceKakaoMap selectedPlaces={selectedPlaces[currentSelectedDate] || []} selectedHotels={selectedHotels} />
        ) : (
          <KakakoMap selectedRegion={selectedRegion} selectedArea={selectedArea} regionMap={regionMap} />
        )}
      </div>
    );
  };

  const handleCloseDatePicker = (data) => {
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
          onHotelSelect: handleHotelSelect, // 호텔 선택 함수 전달
          setSelectedHotel: setSelectedHotel, // selectedHotel 상태 설정 함수 전달
        })}
        {renderNextButton()}
      </div>
      <div className={styles.rightCont}>{renderRightComponent()}</div>
      <DatePickerModal show={showDatePickerModal} onHide={handleCloseDatePicker} />
      <ConfirmModal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} onConfirm={handleConfirm} />
      <HotelDatePickModal
        show={isHotelDatePickModalVisible}
        onHide={() => setIsHotelDatePickModalVisible(false)}
        onConfirm={handleSelectHotels} // onConfirm prop으로 handleSelectHotels 함수 전달
        selectedDates={selectedDates}
        hotelName={hotelName}
        selectedHotel={selectedHotel} // 누락된 prop 추가
      />
    </div>
  );
};

export default AP2Main;
