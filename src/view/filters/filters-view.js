import { createElement } from '../../render.js';

const createTripFiltersViewTemplate = () =>(
  `<form class="trip-filters" action="#" method="get">
  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class TripFiltersView {
  #element = null;

  get template() {
    return createTripFiltersViewTemplate();
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
