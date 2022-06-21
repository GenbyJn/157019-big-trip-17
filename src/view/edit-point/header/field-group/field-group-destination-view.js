import AbstractStatefulView from '@framework/view/abstract-stateful-view';

const createDestinationOption = (name) => `<option value="${name}"></option>`;

const createViewTemplate = ({ type, name, destinationNames = [] }) => (
  `<div class="event__field-group event__field-group--destination">
    <label class="event__label event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input 
      class="event__input event__input--destination" 
      id="event-destination-1"
      type="text"
      name="event-destination"
      value="${name}" 
      list="destination-list-1"
      required
    >
    <datalist id="destination-list-1">
      ${destinationNames.map(createDestinationOption).join('')}
    </datalist>
  </div>`
);

class GroupDestinationView extends AbstractStatefulView {
  constructor({ type, destination: { name } , destinationNames }) {
    super();

    this._state = { type, name, destinationNames };

    this.#setInnterHandlers();
  }

  get template() {
    return createViewTemplate(this._state);
  }

  setNameChangeHandler = (callback) => {
    this._callback.change = callback;
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
    const target = evt.target;

    target.placeholder = target.value;
    target.value = '';

    const targetKeydownHandler = (keydownEvt) => {
      keydownEvt.preventDefault();
    };

    target.addEventListener('focusout', () => {
      target.value = target.placeholder;
      target.removeEventListener('keydown', targetKeydownHandler);
    }, { once: true });

    target.addEventListener('keydown', targetKeydownHandler);
  };

  #destinationInputChangeHandler = (evt) => {
    evt.preventDefault();

    const name = evt.target.value;

    this.updateElement({ name });
    this._callback?.change(name);
  };
}

export default GroupDestinationView;
