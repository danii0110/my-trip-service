import { useState } from 'react';
import CheckHeader from '../AP2_timePicker/CheckHeader/CheckHeader';
import styles from './AP3Left.module.scss';
import CategoryBtn from './CategoryBtn';
import SearchBar from './SearchBar/SearchBar';
import PlaceBox from './PlaceBox';

const placesData = [
  { placeName: '성산 일출봉', category: '명소', address: '대한민국 서귀포시 성산 일출봉' },
  { placeName: '제주 돌하르방 공원', category: '명소', address: '대한민국 제주특별자치도 제주시' },
  { placeName: '흑돼지 거리', category: '식당', address: '대한민국 제주특별자치도 제주시' },
  { placeName: '제주 아르떼 뮤지엄', category: '문화시설', address: '대한민국 제주특별자치도 제주시' },
  { placeName: '한라산 국립공원', category: '레포츠', address: '대한민국 제주특별자치도 제주시' },
  { placeName: '동문 재래시장', category: '쇼핑', address: '대한민국 제주특별자치도 제주시' },
  { placeName: '섭지코지', category: '명소', address: '대한민국 제주특별자치도 서귀포시' },
  { placeName: '우도 잠수함', category: '레포츠', address: '대한민국 제주특별자치도 제주시' },
  { placeName: '제주 현대 미술관', category: '문화시설', address: '대한민국 제주특별자치도 제주시' },
  { placeName: '비자림', category: '명소', address: '대한민국 제주특별자치도 제주시' },
];

const AP3Left = ({ showPlacePicker, toggleShowPlacePicker }) => {
  const [selectedCategory, setSelectedCategory] = useState('추천 장소');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPlaces = placesData.filter((place) => {
    const matchesSearch = searchTerm === '' || place.placeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '추천 장소' || place.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <CheckHeader progress={66} firstColor='#aab1b8' secondColor='#000000' thirdColor='#aab1b8' />
        <div className={styles.titleArea}>광주 동구</div>
        <div className={styles.showDate}>24.04.25(목) - 24.04.29(월)</div>
        <div className={styles.searchBar}>
          <SearchBar onChange={handleSearchChange} />
        </div>
        <div className={styles.categoryBtns}>
          <CategoryBtn
            content='추천 장소'
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <CategoryBtn content='명소' selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <CategoryBtn content='식당' selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <CategoryBtn
            content='문화시설'
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <CategoryBtn content='레포츠' selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <CategoryBtn content='쇼핑' selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>
        <div className={styles.places}>
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place, index) => (
              <PlaceBox key={index} placeName={place.placeName} category={place.category} address={place.address} />
            ))
          ) : (
            <div className={styles.noResults}>검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AP3Left;
