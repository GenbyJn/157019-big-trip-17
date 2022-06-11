import  dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortDate = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortTime = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo)) - dayjs(pointA.dateFrom).diff(dayjs(pointB.dateTo));
};

const formatMonthDate = (date) => dayjs(date).format('MMM D');
const formatTimeDate = (date) => dayjs(date).format('HH:MM');

const formatDuration = (milliseconds) => {
  const durationDate = dayjs.duration(milliseconds);

  if (durationDate.days() > 0) {
    return durationDate.format('DD[D] HH[H] mm[M]');
  }
  if (durationDate.hours() > 0) {
    return durationDate.format('HH[H] mm[M]');
  }

  return durationDate.format('mm[M]');
};

export {
  formatMonthDate,
  formatTimeDate,
  formatDuration,
  sortDate,
  sortTime
};
