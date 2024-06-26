import { useState, useEffect } from 'react';
import axios from 'axios';
import CheckHeader from '../AP2_timePicker/CheckHeader/CheckHeader';
import styles from './AP3Left.module.scss';
import CategoryBtn from './CategoryBtn';
import SearchBar from './SearchBar/SearchBar';
import PlaceBox from './PlaceBox';
import Pagination from '../../../components/Element/Pagination';
import regionMap from '../../../modules/utils/regionMap';
import TimeOverModal from './TimeOverModal/TimeOverModal';

const categoryMap = {
  12: '여행지',
  39: '음식점',
  14: '문화시설',
  28: '레포츠',
  38: '쇼핑',
};

const AP3Left = ({
  selectedDates,
  selectedTimes,
  selectedRegion,
  selectedArea,
  tableData,
  onPlaceSelect,
  selectedPlaces,
  currentSelectedDate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [placesData, setPlacesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [serviceKey, setServiceKey] = useState('');
  const [showTimeOverModal, setShowTimeOverModal] = useState(false); // TimeOverModal 상태 추가

  const categories = ['전체', '여행지', '음식점', '문화시설', '레포츠', '쇼핑'];

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

  const filteredPlaces = placesData.filter((place) => {
    const matchesSearch = searchTerm === '' || place.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || categoryMap[place.contenttypeid] === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const isPlaceChecked = (placeId) => {
    return (
      Array.isArray(selectedPlaces[currentSelectedDate]) &&
      selectedPlaces[currentSelectedDate].some((place) => place.id === placeId)
    );
  };

  const calculateTotalDuration = (places) => {
    return places.reduce((total, place) => total + (place.duration || 120), 0);
  };

  const handlePlaceSelect = (id, place) => {
    const isSelected = isPlaceChecked(id);
    const placeWithDuration = { ...place, duration: place.duration || 120 };

    const updatedPlaces = isSelected
      ? selectedPlaces[currentSelectedDate].filter((p) => p.id !== id)
      : [...(selectedPlaces[currentSelectedDate] || []), placeWithDuration];

    const totalDuration = calculateTotalDuration(updatedPlaces);

    const startTimeInMinutes = parseTimeToMinutes(selectedTimes[currentSelectedDate].start);
    const endTimeInMinutes = parseTimeToMinutes(selectedTimes[currentSelectedDate].end);
    const totalTimeInMinutes = endTimeInMinutes - startTimeInMinutes;

    if (totalDuration > totalTimeInMinutes) {
      setShowTimeOverModal(true); // 시간 초과 시 모달 표시
    } else {
      onPlaceSelect(id, placeWithDuration, !isSelected);
    }
  };

  const parseTimeToMinutes = (time) => {
    const [period, timeStr] = time.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    if (period === '오후' && hours !== 12) hours += 12;
    if (period === '오전' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <CheckHeader progress={66} firstColor='#aab1b8' secondColor='#000000' thirdColor='#aab1b8' />
        <div className={styles.titleArea}>
          {selectedRegion !== undefined && selectedRegion !== null
            ? `${regionMap[selectedRegion]} ${selectedArea}`
            : '지역 정보 없음'}
        </div>
        <div className={styles.showDate}>
          {selectedDates.start && selectedDates.end
            ? `${selectedDates.start.toLocaleDateString()} - ${selectedDates.end.toLocaleDateString()}`
            : '날짜를 선택하세요'}
        </div>
        <div className={styles.searchBar}>
          <SearchBar onChange={handleSearchChange} />
        </div>
        <div className={styles.categoryBtns}>
          {categories.map((category) => (
            <CategoryBtn
              key={category}
              content={category}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ))}
        </div>
        <div className={styles.places}>
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <PlaceBox
                key={place.contentid}
                id={place.contentid}
                placeName={place.title}
                category={categoryMap[place.contenttypeid]}
                address={place.addr1}
                image={place.firstimage}
                mapX={place.mapx}
                mapY={place.mapy}
                onSelect={() => handlePlaceSelect(place.contentid, place)}
                isInitiallyChecked={isPlaceChecked(place.contentid)}
              />
            ))
          ) : (
            <div className={styles.noResults}>검색 결과가 없습니다.</div>
          )}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        {/* <div className={styles.checkData}>
          <h3>전달된 데이터 확인:</h3>
          <p>Region: {selectedRegion !== undefined && selectedRegion !== null ? regionMap[selectedRegion] : '없음'}</p>
          <p>Area: {selectedArea}</p>
          <p>Start Date: {selectedDates.start ? selectedDates.start.toLocaleDateString() : '없음'}</p>
          <p>End Date: {selectedDates.end ? selectedDates.end.toLocaleDateString() : '없음'}</p>
          <p>
            Time:{' '}
            {`${selectedTimes[currentSelectedDate]?.start || ''} ~ ${selectedTimes[currentSelectedDate]?.end || ''}`}
          </p>
          <p>Table Data: {JSON.stringify(tableData)}</p>
        </div> */}
      </div>
      <TimeOverModal
        show={showTimeOverModal}
        onHide={() => setShowTimeOverModal(false)}
        onConfirm={() => setShowTimeOverModal(false)}
      />
    </div>
  );
};

export default AP3Left;
