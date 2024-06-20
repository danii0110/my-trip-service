// dateUtils.js
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const [month, day] = dateStr.split('.');
  return `${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
};

export const convertDateToDurationFormat = (dateStr) => {
  if (!dateStr) return '';
  const [month, day] = dateStr.split('.');
  const nextDay = new Date(2024, parseInt(month) - 1, parseInt(day) + 1);
  const nextMonth = nextDay.getMonth() + 1;
  const nextDate = nextDay.getDate();
  return `2024.${month.padStart(2, '0')}.${day.padStart(2, '0')}.-2024.${nextMonth
    .toString()
    .padStart(2, '0')}.${nextDate.toString().padStart(2, '0')}.`;
};
