import { useState, useEffect } from 'react';
import CheckHeader from '../AP2_timePicker/CheckHeader/CheckHeader';
import styles from './AP4Left.module.scss';
import SearchBar from '../AP3_placePicker/SearchBar/SearchBar';
import { Button } from 'react-bootstrap';
import HotelBox from './HotelBox';
import HotelDatePickModal from './HotelDatePickModal/HotelDatePickModal';

const placesData = [
  { placeName: '롯데 호텔 제주', category: '숙소', address: '대한민국 제주특별자치도 서귀포시 중문관광로 72번길 35' },
  {
    placeName: '해비치 호텔 & 리조트 제주',
    category: '숙소',
    address: '대한민국 제주특별자치도 서귀포시 표선면 민속해안로 537',
  },
  { placeName: '라마다 프라자 제주 호텔', category: '숙소', address: '대한민국 제주특별자치도 제주시 탑동로 66' },
  { placeName: '메종 글래드 제주', category: '숙소', address: '대한민국 제주특별자치도 제주시 연동 263-15' },
  { placeName: '그랜드 하얏트 제주', category: '숙소', address: '대한민국 제주특별자치도 제주시 노형동 102-8' },
  { placeName: '켄싱턴 제주 호텔', category: '숙소', address: '대한민국 제주특별자치도 서귀포시 중문관광로72번길 60' },
  {
    placeName: '휘닉스 제주 섭지코지',
    category: '숙소',
    address: '대한민국 제주특별자치도 서귀포시 성산읍 섭지코지로 107',
  },
  { placeName: '롯데 시티 호텔 제주', category: '숙소', address: '대한민국 제주특별자치도 제주시 도령로 83' },
  {
    placeName: '제주 신화월드',
    category: '숙소',
    address: '대한민국 제주특별자치도 서귀포시 안덕면 신화역사로304번길 38',
  },
  { placeName: '호텔 난타 제주', category: '숙소', address: '대한민국 제주특별자치도 제주시 1100로 474' },
];

const AP4Left = ({
  selectedDates,
  selectedTimes,
  selectedRegion,
  selectedArea,
  tableData,
  selectedPlaces,
  currentSelectedDate,
  regionMap,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showHotelDatePickModal, setShowHotelDatePickModal] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleHotelBoxClick = () => {
    setShowHotelDatePickModal(true);
  };

  const handleModalClose = () => {
    setShowHotelDatePickModal(false);
  };

  const filteredPlaces = placesData.filter((place) => {
    const matchesSearch = searchTerm === '' || place.placeName.toLowerCase().includes(searchTerm.toLowerCase());
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
            <Button id={styles.btnCommon} className={styles.reserveBtn}>
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
              filteredPlaces.map((place, index) => (
                <HotelBox
                  key={index}
                  placeName={place.placeName}
                  category={place.category}
                  address={place.address}
                  onAddClick={handleHotelBoxClick}
                />
              ))
            ) : (
              <div className={styles.noResults}>검색 결과가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
      <HotelDatePickModal show={showHotelDatePickModal} onHide={handleModalClose} onConfirm={handleModalClose} />
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
