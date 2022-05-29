import { createElement } from '@/render.js';

const createSortDayTemplate = () =>(
  `<div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked="">
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>`
);

export default class SortDayView {
  #element = null;

  get template() {
    return createSortDayTemplate();
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
