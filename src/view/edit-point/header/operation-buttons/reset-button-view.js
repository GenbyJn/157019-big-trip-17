import { createElement } from '@/render';

const createResetButtonTemplate = ({ text }) => (
  `<button class="event__reset-btn" type="reset">${text}</button>`
);

export default class ResetButtonView {
  #element = null;
  _state = {};

  constructor({ resetButtonText: text }) {
    this._state = { text };
  }

  get template() {
    return createResetButtonTemplate(this._state);
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
