import { createElement } from '@/render';

const createResetButtonTemplate = ({ text }) => (
  `<button class="event__reset-btn" type="reset">${text}</button>`
);

export default class ResetButtonView {
  _state = {};

  constructor({ resetButtonText: text }) {
    this._state = { text };
  }

  getTemplate() {
    return createResetButtonTemplate(this._state);
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
