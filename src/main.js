import { render, RenderPosition } from './render.js';

import MainInfoTemplate from './view/main-info-view.js';
import MainFiltersTemplate from './view/main-filters-view.js';
import SortItemsTemplate from './view/sort-view.js';
import EventsListTemplate from './view/events-list-view.js';
import PointDestinationTemplate from './view/destination-view.js';
import PointOffersTemplate from './view/offers-view.js';
import EditorPointTemplate from './view/edit-point-view.js';
import Presrnter from './presenter/presenter.js';

const pageHeaderElement = document.querySelector('.page-header');
const pageHeaderTripMainElement = pageHeaderElement.querySelector('.trip-main');
const pageHeaderTripMainFiltersElement = pageHeaderElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const pageMainTripEventsElement = pageMainElement.querySelector('.trip-events');

const presenter = new Presrnter();

render(new MainInfoTemplate(), pageHeaderTripMainElement, RenderPosition.AFTERBEGIN);
render(new MainFiltersTemplate(), pageHeaderTripMainFiltersElement);
render(new SortItemsTemplate(), pageMainTripEventsElement);
render(new EventsListTemplate(), pageMainTripEventsElement);

const pageMainTripEventsListElement = pageMainElement.querySelector('.trip-events__list');
render(new EditorPointTemplate(), pageMainTripEventsListElement);

const pageMainEventDetailsElement = pageMainTripEventsListElement.querySelector('.event__details');
render(new PointOffersTemplate(), pageMainEventDetailsElement);
render(new PointDestinationTemplate(), pageMainEventDetailsElement);

presenter.init(eventsContainer);
