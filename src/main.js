import { render } from './render.js';

import Presenter from './presenter/presenter.js';
import EventsListView from './view/events-list-view.js';

const headerElement = document.querySelector('.page-header');
const headerTripMainElement = headerElement.querySelector('.trip-main');
const headerTripMainFiltersElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const mainTripEventsElement = mainElement.querySelector('.trip-events');

const eventsListView = new EventsListView();
render(eventsListView, mainTripEventsElement);
const tripEventsListElement = eventsListView.getElement();

const presenter = new Presenter();
presenter.init({headerTripMainElement, headerTripMainFiltersElement, mainTripEventsElement, tripEventsListElement});
