import styles from './ScrapBox.module.scss';
import classNames from 'classnames';
import {useNavigate} from "react-router-dom";

const ScrapBox = ({ communityId, startDate, endDate, areaName, selected, onSelect, editMode, imageSrc }) => {
  const navigate = useNavigate();

  const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    const formattedYear = String(year).slice(-2); // 마지막 두 자리
    const formattedMonth = String(month).padStart(2, '0'); // 두 자리로 변환
    const formattedDay = String(day).padStart(2, '0'); // 두 자리로 변환

    return `${formattedYear}.${formattedMonth}.${formattedDay}`;
  };

  const onClick = () => {
    navigate(`/community/detail?communityId=${communityId}`);
  }

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <div
      className={classNames(styles.container, { [styles.selected]: selected })}
      onClick={editMode ? onSelect : onClick}
    >
      <div className={styles.areaName}>{areaName}</div>
      <div className={styles.duration}>{formattedStartDate}-{formattedEndDate}</div>
      <div className={styles.tempImg}>
        <img src={!imageSrc ? null : `/uploads/${imageSrc}`}  alt={!imageSrc ? "": "uploaded"}/>
      </div>
    </div>
  );
};

export default ScrapBox;
