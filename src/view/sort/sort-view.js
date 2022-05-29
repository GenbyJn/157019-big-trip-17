import { createElement } from '@/render.js';

const createSortTemplate = () =>(
  '<form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>'
);

export default class SortView {
  #element = null;

  get template() {
    return createSortTemplate();
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
