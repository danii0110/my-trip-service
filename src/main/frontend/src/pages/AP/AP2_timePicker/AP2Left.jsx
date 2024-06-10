import { useState, useEffect, useRef } from 'react';
import styles from './AP2Left.module.scss';
import { Button } from 'react-bootstrap';
import TrainIcon from '../../../assets/trainIcon.svg';
import CalendarIcon from '../../../assets/calendarIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckHeader from './CheckHeader/CheckHeader';
import TimeTable from './TimeTable';
import DatePickerModal from './DatePicker/DatePickerModal';

const AP2Left = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false); // TimePicker 표시 상태
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });
  const [totalTime, setTotalTime] = useState('총00시간 00분');
  const [currentCell, setCurrentCell] = useState(null); // 현재 시간 조절 중인 셀
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const timeTableRef = useRef(null); // Ref to TimeTable
  const [tableData, setTableData] = useState([
    ['4/25', '목', '오전 10:00', '오후 10:00'],
    ['4/26', '금', '오전 10:00', '오후 10:00'],
    ['4/27', '토', '오전 10:00', '오후 10:00'],
    ['4/28', '일', '오전 10:00', '오후 10:00'],
    ['4/29', '월', '오전 10:00', '오후 10:00'],
  ]);

  useEffect(() => {
    const calculateTotalTime = () => {
      let totalMinutes = 0;
      tableData.forEach((row) => {
        const startTime = row[2];
        const endTime = row[3];
        const start = parseTime(startTime);
        const end = parseTime(endTime);
        if (start !== null && end !== null) {
          totalMinutes += end - start;
        }
      });
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      setTotalTime(`총${hours}시간 ${minutes}분`);
    };

    const parseTime = (timeString) => {
      if (!timeString) return null;
      const [period, time] = timeString.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (period === '오후' && hours !== 12) {
        hours += 12;
      } else if (period === '오전' && hours === 12) {
        hours = 0;
      }
      return hours * 60 + minutes;
    };

    calculateTotalTime();
  }, [tableData]);

  const handleReserve = (url) => {
    window.open(url, '_blank');
  };

  const handleCalendarClick = () => {
    setShowDatePicker(true);
  };

  const handleCloseDatePicker = (dates) => {
    setShowDatePicker(false);
    if (dates.start && dates.end) {
      setSelectedDates(dates);
    }
  };

  const handleTimeIconClick = (event, rowIndex, cellIndex) => {
    const iconRect = event.target.getBoundingClientRect();
    setPopupPosition({
      top: iconRect.top + window.scrollY + iconRect.height, // 시계 아이콘 바로 아래에 위치
      left: iconRect.left + window.scrollX,
    });
    setCurrentCell({ rowIndex, cellIndex });
    setShowTimePicker(true);
  };

  const handleCloseTimePicker = (e) => {
    const time = e.target.value;
    if (time && currentCell) {
      setTableData((prevData) => {
        const newData = [...prevData];
        newData[currentCell.rowIndex][currentCell.cellIndex] = `오후 ${time}`;
        return newData;
      });
    }
    setShowTimePicker(false);
  };

  return (
    <>
      <CheckHeader progress={33} firstColor='#000000' secondColor='#aab1b8' thirdColor='#aab1b8' />
      <div className={styles.titleArea}>광주 동구</div>
      <div className={styles.reserveTransportation}>
        <div className={styles.subTitle}>
          <img className={styles.trainIcon} src={TrainIcon} alt='train-icon' />
          교통수단 예매
        </div>
        <div className={styles.buttons}>
          <Button id={styles.reserveBtn} onClick={() => handleReserve('https://www.kobus.co.kr/main.do')}>
            고속버스 예매
          </Button>
          <Button
            id={styles.reserveBtn}
            onClick={() => handleReserve('https://www.letskorail.com/ebizbf/EbizBfTicketSearch.do')}
          >
            KTX 예매
          </Button>
          <Button id={styles.reserveBtn} onClick={() => handleReserve('https://etk.srail.co.kr/main.do')}>
            SRT 예매
          </Button>
        </div>
      </div>
      <div className={styles.dateChecker}>
        <div className={styles.subTitle}>
          <img className={styles.calendarIcon} src={CalendarIcon} alt='calendar-icon' onClick={handleCalendarClick} />
          {selectedDates.start && selectedDates.end
            ? `${selectedDates.start} - ${selectedDates.end}`
            : '24.04.25(목) - 24.04.29(월)'}
        </div>
        <div className={styles.timeCont}>
          <div>여행시간 상세설정</div>
          <div className={styles.totalTime}>{totalTime}</div>
        </div>
        <p className={styles.timeExp}>
          각 날짜의 일정 시작시간과 종료시간을 설정해 주세요.
          <br />
          기본 설정 시간은 오전 10시~오후 10시 총 12시간입니다.
        </p>
        <div ref={timeTableRef}>
          <TimeTable tableData={tableData} onTimeIconClick={handleTimeIconClick} />
        </div>
      </div>
      <DatePickerModal show={showDatePicker} onHide={handleCloseDatePicker} />
      {showTimePicker && (
        <div
          className={styles.timePickerPopup}
          style={{ top: `${popupPosition.top}px`, left: `${popupPosition.left}px` }}
        >
          <input type='time' defaultValue='10:00' onBlur={handleCloseTimePicker} autoFocus />
        </div>
      )}
    </>
  );
};

export default AP2Left;
