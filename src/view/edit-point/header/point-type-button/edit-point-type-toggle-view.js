import { createElement } from '@/render';

const createEditPointTypeToggleTemplate = () => '<input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox"></input>';

export default class EditPointTypeToggleView {
  getTemplate() {
    return createEditPointTypeToggleTemplate();
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
