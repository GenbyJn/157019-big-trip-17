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

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
  CHANGE_VIEW: 'CHANGE_VIEW',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  INIT: 'INIT',
};

const TripMessage = {
  LOADING: 'Loading...',
};

const UiBlockerTimeLimit = {
  LOWER: 350,
  UPPER: 1000,
};

export {
  POINT_TYPES,
  SortType,
  FilterType,
  UserAction,
  UpdateType,
  TripMessage,
  UiBlockerTimeLimit,
};
