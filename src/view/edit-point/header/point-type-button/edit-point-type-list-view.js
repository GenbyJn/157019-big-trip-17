import { createElement } from '@/render';

const createEditPointTypeListTemplate = () => (
  `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      </fieldset>
  </div>`
);

export default class EditPointTypeListView {
  getTemplate() {
    return createEditPointTypeListTemplate();
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
