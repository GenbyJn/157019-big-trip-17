import { createElement } from '@/render.js';

const createTripSortTemplate = () =>(
  '<form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>'
);

export default class TripSortView {
  getTemplate() {
    return createTripSortTemplate();
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
