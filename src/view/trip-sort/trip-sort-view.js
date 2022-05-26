import { createElement } from '@/render.js';

const createTripSortTemplate = () =>(
  '<form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>'
);

export default class TripSortView {
  #element = null;

  get template() {
    return createTripSortTemplate();
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
