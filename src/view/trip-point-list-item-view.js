import { createElement } from '../render.js';

const createTripPointListItemTemplate = () => (
  '<li class="trip-events__item"></li>'
);

export default class TripPointListItemView {
  getTemplate() {
    return createTripPointListItemTemplate();
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
