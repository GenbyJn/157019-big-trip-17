import { createElement } from '../../render.js';

const createTripFiltersPastTemplate = () =>(
  `<div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>`
);

export default class TripFiltersPastView {
  getTemplate() {
    return createTripFiltersPastTemplate();
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