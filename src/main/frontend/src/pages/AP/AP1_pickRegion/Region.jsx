import styles from './Region.module.scss';

const Region = ({ name, selected, onClick, imageSrc }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={`${styles.regionImg} ${selected ? styles.selected : ''}`}>
        <img src={imageSrc} alt={name} className={styles.image} />
      </div>
      <div className={styles.regionName}>{name}</div>
    </div>
  );
};
export default Region;
