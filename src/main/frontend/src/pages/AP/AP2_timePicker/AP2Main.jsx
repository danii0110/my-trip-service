import React, { useState, useRef, useEffect } from 'react';
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

const placesData = [
  { id: 1, placeName: '성산 일출봉', category: '여행지', address: '대한민국 서귀포시 성산 일출봉' },
  { id: 2, placeName: '제주 돌하르방 공원', category: '여행지', address: '대한민국 제주특별자치도 제주시' },
  { id: 3, placeName: '흑돼지 거리', category: '음식점', address: '대한민국 제주특별자치도 제주시' },
  { id: 4, placeName: '제주 아르떼 뮤지엄', category: '문화시설', address: '대한민국 제주특별자치도 제주시' },
  { id: 5, placeName: '한라산 국립공원', category: '레포츠', address: '대한민국 제주특별자치도 제주시' },
  { id: 6, placeName: '동문 재래시장', category: '쇼핑', address: '대한민국 제주특별자치도 제주시' },
  { id: 7, placeName: '섭지코지', category: '여행지', address: '대한민국 제주특별자치도 서귀포시' },
  { id: 8, placeName: '우도 잠수함', category: '레포츠', address: '대한민국 제주특별자치도 제주시' },
  { id: 9, placeName: '제주 현대 미술관', category: '문화시설', address: '대한민국 제주특별자치도 제주시' },
  { id: 10, placeName: '비자림', category: '여행지', address: '대한민국 제주특별자치도 제주시' },
];

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
            selectedTimes={selectedTimes} // 추가된 부분
            selectedRegion={selectedRegion}
            selectedArea={selectedArea}
            tableData={tableData}
            onPlaceSelect={handlePlaceSelect}
            placesData={placesData}
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

  const handlePlaceSelect = (placeId, isSelected) => {
    setSelectedPlaces((prevPlaces) => {
      const updatedPlaces = { ...prevPlaces };
      console.log(`Place selection changed. currentSelectedDate: ${currentSelectedDateRef.current}`); // ref 사용
      if (isSelected) {
        const placeToAdd = placesData.find((place) => place.id === placeId);
        if (!updatedPlaces[currentSelectedDateRef.current]) {
          updatedPlaces[currentSelectedDateRef.current] = [];
        }
        updatedPlaces[currentSelectedDateRef.current].push(placeToAdd);
        console.log(`Place added on ${currentSelectedDateRef.current}:`, updatedPlaces[currentSelectedDateRef.current]);
      } else {
        if (updatedPlaces[currentSelectedDateRef.current]) {
          updatedPlaces[currentSelectedDateRef.current] = updatedPlaces[currentSelectedDateRef.current].filter(
            (place) => place.id !== placeId
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
            selectedTimes={selectedTimes} // 추가된 부분
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
          onTableDataChange: handleTableDataChange, // 변경된 부분
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
