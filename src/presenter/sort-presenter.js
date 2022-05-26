import { render, RenderPosition } from '../render.js';

import TripSortView from '../view/trip-sort/trip-sort-view.js';
import TripSortDayView from '../view/trip-sort/trip-sort-day-view.js';
import TripSortPointView from '../view/trip-sort/trip-sort-point-view.js';
import TripSortTimeView from '../view/trip-sort/trip-sort-time-view.js';
import TripSortPriceView from '../view/trip-sort/trip-sort-price-view.js';
import TripSortOfferView from '../view/trip-sort/trip-sort-offer-view.js';

export default class TripSortPresenter {
  #tripSortView = new TripSortView();
  #tripSortDayView = new TripSortDayView();
  #tripSortPointView = new TripSortPointView();
  #tripSortTimeView = new TripSortTimeView();
  #tripSortPriceView = new TripSortPriceView();
  #tripSortOfferView = new TripSortOfferView();

  init = (container) => {
    const {mainTripEventsElement} = container;
    render(this.#tripSortView, mainTripEventsElement, RenderPosition.BEFOREEND);
    render(this.#tripSortDayView, this.#tripSortView.element);
    render(this.#tripSortPointView, this.#tripSortView.element);
    render(this.#tripSortTimeView, this.#tripSortView.element);
    render(this.#tripSortPriceView, this.#tripSortView.element);
    render(this.#tripSortOfferView, this.#tripSortView.element);
  };
}
