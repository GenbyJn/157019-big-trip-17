import  dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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
};
