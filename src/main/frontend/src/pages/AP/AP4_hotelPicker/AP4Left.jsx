import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckHeader from '../AP2_timePicker/CheckHeader/CheckHeader';
import styles from './AP4Left.module.scss';
import SearchBar from '../AP3_placePicker/SearchBar/SearchBar';
import { Button } from 'react-bootstrap';
import HotelBox from './HotelBox';
import HotelDatePickModal from './HotelDatePickModal/HotelDatePickModal';
import Pagination from '../../../components/Element/Pagination';
import regionMap from '../../../modules/utils/regionMap';

const categoryMap = {
  32: '숙박',
};

const AP4Left = ({
  selectedDates,
  selectedTimes,
  selectedRegion,
  selectedArea,
  tableData,
  selectedPlaces,
  currentSelectedDate,
  regionMap,
  openHotelModal,
  onHotelSelect, // 호텔 선택 함수
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [placesData, setPlacesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showHotelDatePickModal, setShowHotelDatePickModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [serviceKey, setServiceKey] = useState('');

  useEffect(() => {
    const fetchServiceKey = async () => {
      try {
        const response = await axios.get('/api/serviceKey');
        setServiceKey(response.data);
      } catch (error) {
        console.error('Error fetching service key:', error);
      }
    };

    fetchServiceKey();
  }, []);

  const fetchAreaName = async () => {
    try {
      const response = await axios.get('/area/areaCode');
      const areaSigunguMap = response.data.reduce((acc, curr) => {
        if (!acc[curr.areacode]) {
          acc[curr.areacode] = {};
        }
        acc[curr.areacode][curr.sigungucode || '0'] = curr.name;
        return acc;
      }, {});
      return areaSigunguMap;
    } catch (error) {
      console.error('Error fetching area names:', error);
      return {};
    }
  };

  useEffect(() => {
    const fetchPlacesData = async () => {
      if (!serviceKey) return;

      try {
        const areaMap = await fetchAreaName();
        const sigunguCode = Object.keys(areaMap[selectedRegion]).find(
          (key) => areaMap[selectedRegion][key] === selectedArea
        );

        const response = await axios.get('/data/list', {
          params: {
            apiUri: '/areaBasedList1',
            areaCode: selectedRegion,
            sigunguCode: sigunguCode,
            numOfRows: '10',
            pageNo: currentPage,
            MobileOS: 'ETC',
            MobileApp: 'AppTest',
            _type: 'json',
            serviceKey: serviceKey,
            contentTypeId: 32, // 숙박 정보만 가져오기 위해 contentTypeId 추가
          },
        });

        const items = response.data.response.body.items?.item || [];
        setPlacesData(items);
        setTotalPages(Math.ceil(response.data.response.body.totalCount / 10));
      } catch (error) {
        console.error('Error fetching places data:', error);
      }
    };

    if (selectedRegion && selectedArea && serviceKey) {
      fetchPlacesData();
    }
  }, [selectedRegion, selectedArea, currentPage, serviceKey]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleHotelBoxClick = (hotel) => {
    setSelectedHotel(hotel);
    setShowHotelDatePickModal(true);
    console.log('Hotel selected:', hotel); // 추가된 로그
    onHotelSelect(hotel);
  };

  const handleModalClose = (selectedHotel) => {
    setShowHotelDatePickModal(false);
    if (selectedHotel) {
      setSelectedHotel(selectedHotel);
    }
  };

  const filteredPlaces = placesData.filter((place) => {
    const matchesSearch = searchTerm === '' || place.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const safeCurrentSelectedDate = currentSelectedDate || '';
  const safeSelectedTimes = selectedTimes || {};

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <CheckHeader progress={100} firstColor='#aab1b8' secondColor='#aab1b8' thirdColor='#000000' />
          <div className={styles.leftHeader}>
            <div className={styles.titleArea}>{`${regionMap[selectedRegion]} ${selectedArea}`}</div>
            <Button id={styles.btnCommon} className={styles.reserveBtn} onClick={openHotelModal}>
              숙소 예매
            </Button>
          </div>
          <div className={styles.showDate}>
            {selectedDates.start && selectedDates.end
              ? `${selectedDates.start.toLocaleDateString()} - ${selectedDates.end.toLocaleDateString()}`
              : '날짜를 선택하세요'}
          </div>
          <div className={styles.searchBar}>
            <SearchBar onChange={handleSearchChange} />
          </div>
          <div className={styles.categoryBtn}>추천 숙소</div>
          <div className={styles.places}>
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place) => (
                <HotelBox
                  key={place.contentid}
                  placeName={place.title}
                  category={categoryMap[32]}
                  address={place.addr1}
                  image={place.firstimage}
                  onAddClick={() => handleHotelBoxClick(place)}
                  selectedHotel={selectedHotel} // 선택된 호텔 정보 전달
                />
              ))
            ) : (
              <div className={styles.noResults}>검색 결과가 없습니다.</div>
            )}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
      <HotelDatePickModal
        show={showHotelDatePickModal}
        onHide={handleModalClose}
        onConfirm={handleModalClose}
        selectedDates={selectedDates}
        hotelName={selectedHotel?.title}
        selectedHotel={selectedHotel} // 선택된 호텔 정보 전달
      />
      <div>
        <h3>전달된 데이터 확인:</h3>
        <p>Region: {selectedRegion !== undefined && selectedRegion !== null ? regionMap[selectedRegion] : '없음'}</p>
        <p>Area: {selectedArea}</p>
        <p>Start Date: {selectedDates.start ? selectedDates.start.toLocaleDateString() : '없음'}</p>
        <p>End Date: {selectedDates.end ? selectedDates.end.toLocaleDateString() : '없음'}</p>
        <p>
          Time:{' '}
          {`${safeSelectedTimes[safeCurrentSelectedDate]?.start || ''} ~ ${
            safeSelectedTimes[safeCurrentSelectedDate]?.end || ''
          }`}
        </p>
        <p>Table Data: {JSON.stringify(tableData)}</p>
        <p>Selected Places: {JSON.stringify(selectedPlaces)}</p>
      </div>
    </>
  );
};

export default AP4Left;
