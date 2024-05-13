import { useState } from 'react';
import CheckHeader from '../../../components/CheckHeader/CheckHeader';
import styles from './AP3Left.module.scss';
import CategoryBtn from './CategoryBtn';
import SearchBar from './SearchBar';
import PlaceBox from './PlaceBox';
import ShowPlacePicker from './ShowPlacePicker';

const AP3Left = ({ showPlacePicker, toggleShowPlacePicker }) => {
  const [selectedCategory, setSelectedCategory] = useState('추천 장소'); // 기본 선택 카테고리

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <CheckHeader progress={66} firstColor='#aab1b8' secondColor='#000000' thirdColor='#aab1b8' />
        <div className={styles.titleArea}>광주 동구</div>
        <div className={styles.showDate}>24.04.25(목) - 24.04.29(월)</div>
        <div className={styles.searchBar}>
          <SearchBar />
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
          <PlaceBox />
          <PlaceBox />
          <PlaceBox />
          <PlaceBox />
          <PlaceBox />
        </div>
        {/* toggleShowPlacePicker 함수를 전달해야 함 */}
        {/* <button onClick={toggleShowPlacePicker}>Show Place Picker</button> */}
      </div>
      {/* showPlacePicker prop 전달 */}
      {/* {showPlacePicker && <ShowPlacePicker />} */}
    </div>
  );
};
export default AP3Left;
