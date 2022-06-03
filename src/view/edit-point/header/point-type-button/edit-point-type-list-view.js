import AbstractView from '@/framework/view/abstract-view';

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

export default class EditPointTypeListView extends AbstractView {
  _state = {};

  constructor({ types }) {
    super();
    this._state = { types };

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.typeChangeHandler);
  }

  get template() {
    return createEditPointTypeListTemplate(this._state);
  }

  typeChangeHandler(evt) {

    const type = evt.target.value;

    this._state = {
      ...this._state,
      type,
    };
  }
}
