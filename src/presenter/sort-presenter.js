import { render, RenderPosition } from '@/render.js';

import SortView from '@sort/sort-view.js';
import SortDayView from '@sort/sort-day-view.js';
import SortPointView from '@sort/sort-point-view.js';
import SortTimeView from '@sort/sort-time-view.js';
import SortPriceView from '@sort/sort-price-view.js';
import SortOfferView from '@sort/sort-offer-view.js';

export default class TripSortPresenter {
  #sortView = new SortView();
  #sortDayView = new SortDayView();
  #sortPointView = new SortPointView();
  #sortTimeView = new SortTimeView();
  #sortPriceView = new SortPriceView();
  #sortOfferView = new SortOfferView();

  init (container) {
    const {mainPointsElement} = container;
    render(this.#sortView, mainPointsElement, RenderPosition.BEFOREEND);
    render(this.#sortDayView, this.#sortView.element);
    render(this.#sortPointView, this.#sortView.element);
    render(this.#sortTimeView, this.#sortView.element);
    render(this.#sortPriceView, this.#sortView.element);
    render(this.#sortOfferView, this.#sortView.element);
  }
}
