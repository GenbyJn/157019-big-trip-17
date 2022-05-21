import { createElement } from '@/render';

const createEditPointTypeWrapperTemplate = () => '<div class="event__type-wrapper"></div>';

export default class EditPointTypeWrapperView {
  getTemplate() {
    return createEditPointTypeWrapperTemplate();
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

