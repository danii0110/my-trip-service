import styles from './TimeTable.module.scss';
import ClockIcon from '../../../assets/clockIcon.svg';

const TimeTable = ({ tableData, onTimeIconClick }) => {
  return (
    <div className={styles.timetable}>
      <table className={styles.tableCont}>
        <thead>
          <tr>
            {['일자', '요일', '시작시간', '종료시간'].map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  {cellIndex === 2 || cellIndex === 3 ? (
                    <div className={styles.timeCell}>
                      {cell}
                      <img
                        className={styles.clockIcon}
                        src={ClockIcon}
                        alt='clock-icon'
                        onClick={(event) => onTimeIconClick(event, rowIndex, cellIndex)}
                      />
                    </div>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
