import { useState, useEffect, useRef } from 'react';
import styles from './AP2Left.module.scss';
import { Button } from 'react-bootstrap';
import TrainIcon from '../../../assets/trainIcon.svg';
import CalendarIcon from '../../../assets/calendarIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckHeader from './CheckHeader/CheckHeader';
import TimeTable from './TimeTable';

const AP2Left = ({
  regionMap,
  selectedDates,
  selectedRegion,
  selectedArea,
  openDatePickerModal,
  onTableDataChange,
}) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [totalTime, setTotalTime] = useState('총00시간 00분');
  const [currentCell, setCurrentCell] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const timeTableRef = useRef(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    console.log('AP2Left loaded with:', {
      selectedRegion,
      selectedArea,
      selectedDates,
    });
  }, [selectedRegion, selectedArea, selectedDates]);

  useEffect(() => {
    if (selectedDates.start && selectedDates.end) {
      const startDate = new Date(selectedDates.start);
      const endDate = new Date(selectedDates.end);
      const daysArray = [];
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const day = new Date(d);
        const dayString = day.toLocaleDateString('ko-KR', { weekday: 'short' });
        daysArray.push([day.toLocaleDateString(), dayString, '오전 10:00', '오후 10:00']);
      }
      setTableData(daysArray);
      onTableDataChange(daysArray); // 변경된 데이터 전달
    }
  }, [selectedDates]);

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

    calculateTotalTime();
  }, [tableData]);

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

  const parseTimeToAmPm = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? '오후' : '오전';
    const adjustedHours = hours % 12 || 12;
    return `${period} ${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleReserve = (url) => {
    window.open(url, '_blank');
  };

  const handleCalendarClick = () => {
    openDatePickerModal();
  };

  const handleTimeIconClick = (event, rowIndex, cellIndex) => {
    const iconRect = event.target.getBoundingClientRect();
    setPopupPosition({
      top: iconRect.top + window.scrollY + iconRect.height,
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
        const formattedTime = parseTimeToAmPm(time);
        if (currentCell.cellIndex === 2) {
          const endTime = newData[currentCell.rowIndex][3];
          if (parseTime(formattedTime) >= parseTime(endTime)) {
            alert('시작시간은 종료시간보다 늦을 수 없습니다.');
            setShowTimePicker(false);
            return prevData;
          }
        } else if (currentCell.cellIndex === 3) {
          const startTime = newData[currentCell.rowIndex][2];
          if (parseTime(formattedTime) <= parseTime(startTime)) {
            alert('종료시간은 시작시간보다 이를 수 없습니다.');
            setShowTimePicker(false);
            return prevData;
          }
        }
        newData[currentCell.rowIndex][currentCell.cellIndex] = formattedTime;
        onTableDataChange(newData); // 변경된 데이터 전달
        return newData;
      });
    }
    setShowTimePicker(false);
  };

  return (
    <>
      <CheckHeader progress={33} firstColor='#000000' secondColor='#aab1b8' thirdColor='#aab1b8' />
      <div className={styles.titleArea}>
        {selectedRegion !== undefined && selectedRegion !== null
          ? `${regionMap[selectedRegion]} ${selectedArea}`
          : '지역 정보 없음'}
      </div>
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
            ? `${selectedDates.start.toLocaleDateString()} - ${selectedDates.end.toLocaleDateString()}`
            : '날짜를 선택하세요'}
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
      {showTimePicker && (
        <div
          className={styles.timePickerPopup}
          style={{ top: `${popupPosition.top}px`, left: `${popupPosition.left}px` }}
        >
          <input type='time' defaultValue='10:00' onBlur={handleCloseTimePicker} autoFocus />
        </div>
      )}
      <div>
        <h3>전달된 지역 정보:</h3>
        <p>Region: {selectedRegion !== undefined && selectedRegion !== null ? regionMap[selectedRegion] : '없음'}</p>
        <p>Area: {selectedArea}</p>
        <p>Start Date: {selectedDates.start ? selectedDates.start.toLocaleDateString() : '없음'}</p>
        <p>End Date: {selectedDates.end ? selectedDates.end.toLocaleDateString() : '없음'}</p>
      </div>
    </>
  );
};

export default AP2Left;
