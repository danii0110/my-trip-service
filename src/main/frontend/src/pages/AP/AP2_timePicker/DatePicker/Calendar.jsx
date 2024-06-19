import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ setSelectedDates }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);

    if (end) {
      const diffInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // 끝나는 날짜와 시작 날짜 사이의 날짜 차이 계산
      if (diffInDays <= 4) {
        setEndDate(end); // 날짜 차이가 4박 5일 이하일 경우에만 끝나는 날짜 설정
        const selectedDates = { start, end };
        setSelectedDates(selectedDates); // 선택한 날짜 설정
        console.log('Selected dates set in Calendar:', selectedDates);
      } else {
        alert('날짜 설정은 최대 5일까지 가능합니다.');
        setEndDate(null); // 날짜 차이가 초과되면 끝나는 날짜를 null로 설정
        setSelectedDates({ start, end: null }); // 선택한 날짜를 업데이트
      }
    } else {
      setEndDate(null); // 끝나는 날짜가 선택되지 않으면 null로 설정
      setSelectedDates({ start, end: null }); // 선택한 날짜를 업데이트
    }
  };

  return (
    <>
      <DatePicker
        renderCustomHeader={({ monthDate, customHeaderCount, decreaseMonth, increaseMonth }) => (
          <div>
            <button
              aria-label='Previous Month'
              className={'react-datepicker__navigation react-datepicker__navigation--previous'}
              style={customHeaderCount === 1 ? { visibility: 'hidden' } : null}
              onClick={decreaseMonth}
            >
              <span className={'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'}>
                {'<'}
              </span>
            </button>
            <span className='react-datepicker__current-month'>
              {monthDate.toLocaleString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button
              aria-label='Next Month'
              className={'react-datepicker__navigation react-datepicker__navigation--next'}
              style={customHeaderCount === 0 ? { visibility: 'hidden' } : null}
              onClick={increaseMonth}
            >
              <span className={'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'}>{'>'}</span>
            </button>
          </div>
        )}
        minDate={new Date()} // 선택 가능한 최소 날짜를 설정, 오늘 이후에 선택 가능
        monthsShown={2} // 한 번에 표시되는 월의 수
        swapRange
        selected={startDate} // 초기 설정된 날짜
        onChange={onChange} // 날짜 변경 핸들러
        startDate={startDate} // 시작 날짜 설정
        endDate={endDate} // 끝나는 날짜 설정
        selectsRange // 범위 선택 활성화
        selectsDisabledDaysInRange
        inline
      />
    </>
  );
};

export default Calendar;
