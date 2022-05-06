import Presenter from './presenter/presenter.js';


const headerTripMainElement = document.querySelector('.trip-main');
const headerTripMainFiltersElement = headerTripMainElement.querySelector('.trip-controls__filters');
const mainTripEventsElement = document.querySelector('.trip-events');

const presenter = new Presenter();
presenter.init({headerTripMainElement, headerTripMainFiltersElement, mainTripEventsElement});
