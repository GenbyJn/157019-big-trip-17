import { createElement } from '../../render.js';

const createTripSortPriceTemplate = () =>(
  `<div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>`
);

export default class TripSortPriceView {
  getTemplate() {
    return createTripSortPriceTemplate();
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