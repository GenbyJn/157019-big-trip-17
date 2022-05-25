import { createElement } from '@/render';

const createTypeItemTemplate = ({ id, text, isChecked = false } = {}) => (
  `<div class="event__type-item">
    <input 
      id="event-type-${id}" 
      class="event__type-input visually-hidden"
      type="radio" 
      name="event-type"
      value="${id}"
      ${isChecked ? 'checked' : ''}
    >
    <label class="event__type-label event__type-label--${id}" for="event-type-${id}">${text}</label>
  </div>`
);

const createEditPointTypeListTemplate = ({ types }) => (
  `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${types.map(createTypeItemTemplate).join('')}
    </fieldset>
  </div>`
);

export default class EditPointTypeListView {
  _state = {};

  constructor({ types }) {
    this._state = { types };

    this.getElement().querySelector('.event__type-group')
      .addEventListener('change', this.typeChangeHandler);
  }

  getTemplate() {
    return createEditPointTypeListTemplate(this._state);
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

  typeChangeHandler(evt) {

    const type = evt.target.value;

    this._state = {
      ...this._state,
      type,
    };
  }
}
