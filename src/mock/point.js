import { generateDestination } from './destination';
import { randomizeInteger } from './random';
import { POINT_TYPES } from '@/mock/const';
import { nanoid } from 'nanoid';

const generatePointType = () =>
  POINT_TYPES[randomizeInteger(0, POINT_TYPES.length - 1)];

const generatePoint = ({
  type = generatePointType(),
  // id = '0',
  basePrice = 1000,
  offers = [],
  dateFrom = new Date('2019-07-10T19:30:56.845Z'),
  dateTo = new Date('2019-07-11T11:22:13.375Z'),
  pointDestination = generateDestination().name,
} = {}) => ({
  basePrice,
  dateFrom,
  dateTo,
  destination: generateDestination(),
  pointDestination,
  id: nanoid(),
  isFavorite: false,
  offers,
  type
});

const generatePoints = () => [
  generatePoint({
    type: 'drive',
    id: '1',
    basePrice: 100,
    dateFrom: new Date('2019-06-10T10:30:56.845Z'),
    dateTo: new Date('2019-06-11T14:22:13.375Z'),
    pointDestination: 'Moon',
    offers: [
      { id: 1, title: 'Add luggage', price: 50 },
      { id: 2, title: 'Switch to comfort', price: 80 },
    ]
  }),
  generatePoint({
    id: '2',
    dateFrom: new Date('2019-07-12T07:30:56.845Z'),
    dateTo: new Date('2019-07-13T09:22:13.375Z'),
    basePrice: 200,
    isFavorite: true
  }),
  generatePoint({
    type: 'train',
    id: '3',
    dateFrom: new Date('2019-08-14T14:30:56.845Z'),
    dateTo: new Date('2019-08-15T19:22:13.375Z'),
    basePrice: 1000
  })
];

export { generatePoint, generatePoints, generateDestination };

