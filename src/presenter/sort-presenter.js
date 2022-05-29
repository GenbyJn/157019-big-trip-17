import { render, RenderPosition } from '../render.js';

import SortView from '../view/sort/sort-view.js';
import SortDayView from '../view/sort/sort-day-view.js';
import SortPointView from '../view/sort/sort-point-view.js';
import SortTimeView from '../view/sort/sort-time-view.js';
import SortPriceView from '../view/sort/sort-price-view.js';
import SortOfferView from '../view/sort/sort-offer-view.js';

export default class TripSortPresenter {
  #sortView = new SortView();
  #sortDayView = new SortDayView();
  #sortPointView = new SortPointView();
  #sortTimeView = new SortTimeView();
  #sortPriceView = new SortPriceView();
  #sortOfferView = new SortOfferView();

  init = (container) => {
    const {mainTripEventsElement} = container;
    render(this.#sortView, mainTripEventsElement, RenderPosition.BEFOREEND);
    render(this.#sortDayView, this.#sortView.element);
    render(this.#sortPointView, this.#sortView.element);
    render(this.#sortTimeView, this.#sortView.element);
    render(this.#sortPriceView, this.#sortView.element);
    render(this.#sortOfferView, this.#sortView.element);
  };
}
