import InfoPresenter from './presenter/info-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import PointListPresenter from './presenter/point-list-presenter.js';
import PointModel from './model/point-model.js';

const headerTripMainElement = document.querySelector('.trip-main');
const headerMainFiltersElement = headerTripMainElement.querySelector('.trip-controls__filters');
const mainPointsElement = document.querySelector('.trip-events');

const pointModel = new PointModel();
const infoPresenter = new InfoPresenter();
const filtersPresenter = new FiltersPresenter();
const pointListPresenter = new PointListPresenter(pointModel);

infoPresenter.init({headerTripMainElement});
filtersPresenter.init({headerMainFiltersElement});
pointListPresenter.init(mainPointsElement);

