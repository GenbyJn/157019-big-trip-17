import { createElement } from '@/render';

const createSaveButtonTemplate = () => (
  '<button class="event__save-btn btn btn--blue" type="submit">Save</button>'
);

export default class SaveButtonView {
  #element = null;

  get template() {
    return createSaveButtonTemplate();
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

