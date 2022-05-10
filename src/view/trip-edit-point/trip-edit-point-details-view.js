import { createElement } from '../../render.js';

const createTripEditPointDetailsTemplate = () => (
  '<section class="event__details"></section>'
);

export default class TripEditPointDetailsView {
  getTemplate() {
    return createTripEditPointDetailsTemplate();
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


