import AbstractStatefulView from '@framework/view/abstract-stateful-view';

import he from 'he';

const createDestinationOption = (name) => `<option value="${he.encode(name)}"></option>`;

const createViewTemplate = ({ type, destinationName, destinationNames = [] }) => (
  `<div class="event__field-group event__field-group--destination">
    <label class="event__label event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input 
      class="event__input event__input--destination" 
      id="event-destination-1"
      type="text"
      name="event-destination"
      value="${he.encode(destinationName)}" 
      list="destination-list-1"
      required
    >
    <datalist id="destination-list-1">
      ${destinationNames.map(createDestinationOption).join('')}
    </datalist>
  </div>`
);

class GroupDestinationView extends AbstractStatefulView {
  constructor({ type, destinationName, destinationNames }) {
    super();

    this._state = { type, destinationName, destinationNames, isValid: true };

    this.#setInnterHandlers();
  }

  get template() {
    return createViewTemplate(this._state);
  }

  setNameChangeHandler = (callback) => {
    this._callback.change = callback;
  };

  setValidity = (message = '') => {
    this._state.isValid = message === '';
    this.element.querySelector('.event__input--destination').setCustomValidity(message);
  };

  _restoreHandlers = () => {
    this.#setInnterHandlers();
  };

  #setInnterHandlers = () => {
    const destinationInputElement = this.element.querySelector('.event__input--destination');

    destinationInputElement.addEventListener('focusin', this.#destinationInputFocusinHandler);
    destinationInputElement.addEventListener('change', this.#destinationInputChangeHandler);
  };

  #destinationInputFocusinHandler = (evt) => {
    const inputElement = evt.target;

    inputElement.placeholder = inputElement.value;
    inputElement.value = '';

    const InputFocusoutHandler = (focusoutEvt) => {
      focusoutEvt.preventDefault();

      if (inputElement.value === '') {
        inputElement.value = inputElement.placeholder;
        return;
      }

      if (! this._state.isValid) {
        inputElement.value = '';
        inputElement.placeholder = '';
        this._state.destinationName = '';
      }
    };

    inputElement.addEventListener('focusout', InputFocusoutHandler, { once: true });
  };

  #destinationInputChangeHandler = (evt) => {
    evt.preventDefault();

    const { value, placeholder } = evt.target;

    if (value !== placeholder) {
      this._state.destinationName = value;
      this._callback?.change(value);
    }

    evt.target.blur();
  };
}

export default GroupDestinationView;
