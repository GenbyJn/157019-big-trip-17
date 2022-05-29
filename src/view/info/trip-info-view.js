import { createElement } from '@/render.js';

const createInfoTemplate = () => (
  '<section class="trip-main__trip-info  trip-info"></section>'
);

export default class InfoView {
  #element = null;

  get template() {
    return createInfoTemplate();
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
