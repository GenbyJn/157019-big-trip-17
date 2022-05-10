import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripFiltersPresenter from './presenter/trip-filters-presenter.js';
import TripSortPresenter from './presenter/trip-sort-presenter.js';
import TripPointListPresenter from './presenter/trip-point-list-presenter.js';
import TripPointModel from './model/trip-point-model.js';

const headerTripMainElement = document.querySelector('.trip-main');
const headerTripMainFiltersElement = headerTripMainElement.querySelector('.trip-controls__filters');
const mainTripEventsElement = document.querySelector('.trip-events');

const tripPointModel = new TripPointModel();
const tripInfoPresenter = new TripInfoPresenter();
const tripFiltersPresenter = new TripFiltersPresenter();
const tripSortPresenter = new TripSortPresenter();
const tripPointListPresenter = new TripPointListPresenter();

tripInfoPresenter.init({headerTripMainElement});
tripFiltersPresenter.init({headerTripMainFiltersElement});
tripSortPresenter.init({mainTripEventsElement});
tripPointListPresenter.init({mainTripEventsElement, tripPointModel});

