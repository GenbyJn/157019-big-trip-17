import InfoPresenter from './presenter/info-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import PointListPresenter from './presenter/point-list-presenter.js';
import TripPointModel from './model/trip-point-model.js';

const headerTripMainElement = document.querySelector('.trip-main');
const headerMainFiltersElement = headerTripMainElement.querySelector('.trip-controls__filters');
const mainTripEventsElement = document.querySelector('.trip-events');

const tripPointModel = new TripPointModel();
const infoPresenter = new InfoPresenter();
const filtersPresenter = new FiltersPresenter();
const sortPresenter = new SortPresenter();
const pointListPresenter = new PointListPresenter();

infoPresenter.init({headerTripMainElement});
filtersPresenter.init({headerMainFiltersElement});
sortPresenter.init({mainTripEventsElement});
pointListPresenter.init({mainTripEventsElement, tripPointModel});

