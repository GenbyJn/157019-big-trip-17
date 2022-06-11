const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const POINT_DESTINATIONS = [
  'Moon',
  'Mars',
  'Phobos',
  'Deimos',
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SortType = {
  DEFAULT: 'default',
  TIME: 'time',
  PRICE: 'price',
};

export {
  POINT_TYPES,
  POINT_DESTINATIONS,
  FilterType,
  SortType
};

