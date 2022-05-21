import { createElement } from '@/render';

const createSaveButtonTemplate = () => '<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>';

export default class SaveButtonView {
  getTemplate() {
    return createSaveButtonTemplate();
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

