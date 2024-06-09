import styles from './Region.module.scss';

const Region = ({ name, selected, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={`${styles.regionImg} ${selected ? styles.selected : ''}`}></div>
      <div className={styles.regionName}>{name}</div>
    </div>
  );
};
export default Region;
