import { createElement } from '../../render.js';

const createFiltersEverythingTemplate = () =>(
  `<div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked="">
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>`
);

export default class FiltersEverythingView {
  getTemplate() {
    return createFiltersEverythingTemplate();
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
