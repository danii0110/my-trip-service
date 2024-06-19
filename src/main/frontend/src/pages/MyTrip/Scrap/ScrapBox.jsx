import styles from './ScrapBox.module.scss';
import classNames from 'classnames';

const ScrapBox = ({ date, areaName, selected, onSelect, editMode }) => {
  return (
    <div
      className={classNames(styles.container, { [styles.selected]: selected })}
      onClick={editMode ? onSelect : undefined}
    >
      <div className={styles.areaName}>{areaName}</div>
      <div className={styles.duration}>{date}</div>
      <div className={styles.tempImg}></div>
    </div>
  );
};

export default ScrapBox;
