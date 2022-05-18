import { createElement } from '../render.js';

export default class AbstractView {
  element = null;

  getTemplate() {
    return '';
  }

  getElement() {
    if (this.element === null) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
