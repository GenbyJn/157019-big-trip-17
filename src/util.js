import * as dayjs from 'dayjs';
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

// Источник https://learn.javascript.ru/task/random-int-min-max
const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const formatingToDate = (dueDate) => dayjs(dueDate).format('MMM D');
const formatingToTime = (dueDate) => dayjs(dueDate).format('HH:MM');

const differenceTime = (dateTo, dateFrom) => dayjs(dateTo).diff(dateFrom, 'hour');

const camalizeFirstCharacter = ([initial, ...rest]) => [initial.toUpperCase(), ...rest].join('');

export { randomInteger, formatingToDate, formatingToTime, differenceTime, camalizeFirstCharacter };

