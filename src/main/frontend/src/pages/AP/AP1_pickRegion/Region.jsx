import { useState } from 'react';
import styles from './Region.module.scss';

const Region = () => {
  //선택 상태를 관리하는 상태와 함수 추가
  const [selected, setSelected] = useState(false);

  //지역 클릭 시 선택 상태를 토글하는 함수
  const handleRegionClick = () => {
    setSelected(!selected);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.regionImg} ${selected ? styles.selected : ''}`} onClick={handleRegionClick}></div>
      <div className={styles.regionName}>지역명</div>
    </div>
  );
};
export default Region;
