import { useState } from 'react';
import styles from './Region.module.scss';

const Region = () => {
  const [selected, setSelected] = useState(false);

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
