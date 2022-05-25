import { createElement } from '@/render.js';

const createEditPointHeaderTemplate = () => '<header class="event__header"></header>';

export default class EditPointHeaderView {
  getTemplate() {
    return createEditPointHeaderTemplate();
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


