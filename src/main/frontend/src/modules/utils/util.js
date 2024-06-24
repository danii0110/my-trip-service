export const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    const formattedYear = String(year).slice(-2); // 마지막 두 자리
    const formattedMonth = String(month).padStart(2, '0'); // 두 자리로 변환
    const formattedDay = String(day).padStart(2, '0'); // 두 자리로 변환

    return `${formattedYear}.${formattedMonth}.${formattedDay}`;
};

export const formatDateTime = (dateArray) => {
    const [year, month, day, hours, minutes, seconds] = dateArray;
    const formattedYear = String(year).slice(-2); // 마지막 두 자리
    const formattedMonth = String(month).padStart(2, '0'); // 두 자리로 변환
    const formattedDay = String(day).padStart(2, '0'); // 두 자리로 변환
    const formattedHours = String(hours).padStart(2, '0'); // 두 자리로 변환
    const formattedMinutes = String(minutes).padStart(2, '0'); // 두 자리로 변환
    const formattedSeconds = String(seconds).padStart(2, '0'); // 두 자리로 변환

    return `${formattedYear}.${formattedMonth}.${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;

    if (timeDiff < 0) {
        throw new Error("endDate must be after startDate");
    }

    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    const nights = Math.floor(daysDiff); // 일 수의 소수점을 버림
    const days = nights + 1; // 1박은 2일

    return `${nights}박 ${days}일`;
};