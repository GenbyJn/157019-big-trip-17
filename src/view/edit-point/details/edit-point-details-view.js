import { createElement } from '@/render.js';

const createEditPointDetailsTemplate = () => (
  '<section class="event__details"></section>'
);

export default class EditPointDetailsView {
  #element = null;

  get template() {
    return createEditPointDetailsTemplate();
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


