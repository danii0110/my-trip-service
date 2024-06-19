import styles from './MoveTime.module.scss';

const MoveTime = ({ moveTime }) => {
  return (
    <div className={styles.container}>
      <div className={styles.moveTime}>{moveTime} &gt;</div>
    </div>
  );
};

export default MoveTime;
