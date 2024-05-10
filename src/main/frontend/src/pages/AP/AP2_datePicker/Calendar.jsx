import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  // const addDays = (date, days) => {
  //   const result = new Date(date);
  //   result.setDate(result.getDate() + days);
  //   return result;
  // };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    const diffInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); //끝나는 날짜와 시작 날짜 사이의 날짜 차이 계산
    if (diffInDays <= 4) {
      setEndDate(end); // 날짜 차이가 4박 5일 이하일 경우에만 끝나는 날짜 설정
    } else {
      alert('날짜 설정은 최대 5일까지 가능합니다.');
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
        minDate={new Date()} //선택 가능한 최소 날짜를 설정, 오늘 이후에 선택 가능
        monthsShown={2} //한 번에 표시되는 월의 수
        swapRange
        selected={startDate} //초기에 표시할 날짜를 설정, 선택된 날짜를 표시
        onChange={onChange}
        startDate={startDate} //시작 날짜 설정
        endDate={endDate} //끝나는 날짜 설정
        // excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
        selectsRange //범위 선택 활성화
        selectsDisabledDaysInRange
        inline
      />
    </>
  );
};
export default Calendar;
