import { createElement } from '@/render.js';

const createTripFiltersFutureTemplate = () =>(
  `<div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>`
);

export default class TripFiltersFutureView {
  #element = null;

  get template() {
    return createTripFiltersFutureTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
