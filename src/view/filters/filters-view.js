import { createElement } from '../../render.js';

const createTripFiltersViewTemplate = () =>(
  `<form class="trip-filters" action="#" method="get">
  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class TripFiltersView {
  getTemplate() {
    return createTripFiltersViewTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
