import AbstractStatefulView from '@/framework/view/abstract-stateful-view';

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

const createViewTemplate = ({ types }) => (
  `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${types.map(createTypeItemTemplate).join('')}
    </fieldset>
  </div>`
);

export default class EditPointTypeListView extends AbstractStatefulView {
  constructor({ type, types }) {
    super();

    this._state = { type, types };
  }

  get template() {
    return createViewTemplate(this._state);
  }

  setTypeChangeHandler = (callback) => {
    this._callback.change = callback;
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeGroupChangeHandler);
  };

  _restoreHandlers = () => {
    this.setTypeChangeHandler(this._callback.change);
  };

  #typeGroupChangeHandler = (evt) => {
    const type = evt.target.value;

    this._setState({ type });
    this._callback.change?.(type);
  };

}
