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

const sortDateUp = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  return weight ?? dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
};

const sortDateDown = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  return weight ?? dayjs(taskB.dueDate).diff(dayjs(taskA.dueDate));
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
  sortDateUp,
  sortDateDown
};
