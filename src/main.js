import InfoPresenter from '@presenter/info-presenter';
import FiltersPresenter from '@presenter/filters-presenter';
import PointListPresenter from '@presenter/point-list-presenter';

import PointsModel from '@model/points-model';
import DestinationsModel from '@model/destinations-model';
import OffersModel from '@model/offers-model';

import NewEventButtonView from '@view/new-event-button-view';

import PointsApiService from '@service/points-api-service';

import { render } from '@framework/render';

const AUTHORIZATION = 'Basic nGjZJ3hqXyh8';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';

const headerTripMainElement = document.querySelector('.trip-main');
const headerMainFiltersElement = headerTripMainElement.querySelector('.trip-controls__filters');
const mainPointsElement = document.querySelector('.trip-events');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel(pointsApiService);
const destinationsModel = new DestinationsModel(pointsApiService);
const offersModel = new OffersModel(pointsApiService);

const infoPresenter = new InfoPresenter();
const filtersPresenter = new FiltersPresenter();
const pointListPresenter = new PointListPresenter(
  mainPointsElement,
  pointsModel,
  destinationsModel,
  offersModel,
);

const newEventButtonComponent = new NewEventButtonView();

newEventButtonComponent.setClickHandler(() => {
  newEventButtonComponent.setDisabled(true);

  pointListPresenter.createPoint(() => {
    newEventButtonComponent.setDisabled(false);
  });
});


infoPresenter.init(headerTripMainElement);
filtersPresenter.init(headerMainFiltersElement);
pointListPresenter.init();

render(newEventButtonComponent, headerTripMainElement);

Promise.all([
  destinationsModel.init(),
  offersModel.init(),
]).finally(() => {
  pointsModel.init();
});
