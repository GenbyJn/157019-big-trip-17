import { generateDestination } from './destination';
import { randomInteger } from './random';
import { POINT_TYPES } from '@/const';

const generatePointType = () =>
  POINT_TYPES[randomInteger(0, POINT_TYPES.length - 1)];

const generatePoint = ({
  type = generatePointType(),
  id = '0',
  basePrice = 1000,
  isFavorite = false,
  offers = []
} = {}) => ({
  basePrice,
  dateFrom: new Date('2019-07-10T22:55:56.845Z'),
  dateTo: new Date('2019-07-11T11:22:13.375Z'),
  destination: generateDestination,
  id,
  isFavorite,
  offers,
  type
});

const generatePoints = () => [
  generatePoint({
    type: 'drive',
    id: '1',
    basePrice: 100,
    offers: [
      { id: 1, title: 'Add luggage', price: 50 },
      { id: 2, title: 'Switch to comfort', price: 80 },
    ]
  }),
  generatePoint({
    id: '2',
    basePrice: 200,
    isFavorite: true
  }),
  generatePoint({
    type: 'train',
    id: '3',
    basePrice: 1000
  })
];

export { generatePoint, generatePoints };
