import styles from './TimeTable.module.scss';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
const TimeTable = () => {
  const tableData = [
    ['4/25', '목', '오전 10:00', '오후 10:00'],
    ['4/26', '금', '오전 10:00', '오후 10:00'],
    ['4/27', '토', '오전 10:00', '오후 10:00'],
    ['4/28', '일', '오전 10:00', '오후 10:00'],
    ['4/29', '월', '오전 10:00', '오후 10:00'],
  ];
  return (
    <div className={styles.timetable}>
      <Table responsive className={styles.tableCont}>
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
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default TimeTable;
