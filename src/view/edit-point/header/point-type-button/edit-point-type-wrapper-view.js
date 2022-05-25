import { createElement } from '@/render';

const createEditPointTypeWrapperTemplate = ({ type }) => (
  `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox"></input>
  </div>`
);

export default class EditPointTypeWrapperView {
  _state = null;

  constructor({ type }) {
    this._state = { type };
  }

  getTemplate() {
    return createEditPointTypeWrapperTemplate(this._state);
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

