import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DailyCalendar = ({ startDate, endDate, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
    onSelect(date);
  };

  return (
    <>
      <DatePicker selected={selectedDate} onChange={handleChange} minDate={startDate} maxDate={endDate} inline />
    </>
  );
};

export default DailyCalendar;
