import { createElement } from '@/render.js';

const createTripInfoTemplate = () => (
  '<section class="trip-main__trip-info  trip-info"></section>'
);

export default class TripInfoView {
  #element = null;

  get template() {
    return createTripInfoTemplate();
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
