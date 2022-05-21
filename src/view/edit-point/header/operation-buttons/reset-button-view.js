import { createElement } from '@/render';

const createResetButtonTemplate = () => '<button class="event__reset-btn" type="reset">Delete</button>';

export default class ResetButtonView {
  getTemplate() {
    return createResetButtonTemplate();
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
