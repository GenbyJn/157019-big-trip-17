const sortByDay = (pointA, pointB) => pointA.dateFrom - pointB.dateFrom;
const sortByTime = (pointA, pointB) => (pointB.dateTo - pointB.dateFrom) - (pointA.dateTo - pointA.dateFrom);
const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export {
  sortByDay,
  sortByTime,
  sortByPrice
};
