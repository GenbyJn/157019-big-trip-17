import { createElement } from '@/render.js';

const createTripSortPointTemplate = () =>(
  `<div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled="">
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>`
);

export default class TripSortPointView {
  getTemplate() {
    return createTripSortPointTemplate();
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
