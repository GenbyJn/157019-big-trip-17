import { createElement } from '../../render.js';

const createTripEditPointTemplate = () => (
  `<form class="event event--edit" action="#" method="post">
  </form>`
);

export default class TripEditPointView {
  getTemplate() {
    return createTripEditPointTemplate();
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


