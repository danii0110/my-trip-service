import { useState } from 'react';
import styles from './AreaBtn.module.scss';

const AreaBtn = (props) => {
  const [selected, setSelected] = useState(false);

  const handleRegionClick = () => {
    setSelected(!selected);
  };

  return (
    <button
      className={`${styles.container} ${selected ? styles.selected : ''}`}
      onClick={handleRegionClick}
      type='button'
    >
      동대문구
    </button>
  );
};
export default AreaBtn;
