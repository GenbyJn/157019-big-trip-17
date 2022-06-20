import InfoPresenter from './presenter/info-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import PointListPresenter from './presenter/point-list-presenter.js';
import PointsModel from './model/points-model.js';

import PointsApiService from './points-api-service';

const AUTHORIZATION = 'Basic 157019-big-trip-1';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';

const headerTripMainElement = document.querySelector('.trip-main');
const headerMainFiltersElement = headerTripMainElement.querySelector('.trip-controls__filters');
const mainPointsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));

const infoPresenter = new InfoPresenter();
const filtersPresenter = new FiltersPresenter();
const pointListPresenter = new PointListPresenter(mainPointsElement, pointsModel);

infoPresenter.init({headerTripMainElement});
filtersPresenter.init({headerMainFiltersElement});

pointListPresenter.init();

pointsModel.init()
  .finally(() => {
    // console.log(pointsModel.points);
  })
  .catch((err) => {
    console.warn(err);
  });
