import { createElement } from '@/render.js';

const createEditPointHeaderTemplate = () => '<header class="event__header"></header>';

export default class EditPointHeaderView {
  #element = null;

  get template() {
    return createEditPointHeaderTemplate();
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


