import { render } from './render.js';

import PointDestinationView from './view/destination-view.js';
import PointOffersView from './view/offers-view.js';

import Presentor from './presenter/presenter.js';

const header = document.querySelector('.page-header');
const headerTripMain = header.querySelector('.trip-main');
const headerTripMainFilters = header.querySelector('.trip-controls__filters');
const main = document.querySelector('.page-main');
const mainTripEvents = main.querySelector('.trip-events');

import EventsListView from './view/events-list-view.js';
render(new EventsListView(), mainTripEvents);
const tripEventsList = main.querySelector('.trip-events__list');

const presenter = new Presentor();
presenter.init({headerTripMain, headerTripMainFilters, mainTripEvents, tripEventsList});


const eventDetails = tripEventsList.querySelector('.event__details');

render(new PointOffersView(), eventDetails);
render(new PointDestinationView(), eventDetails);


