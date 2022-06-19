import AbstractStatefulView from '@/framework/view/abstract-stateful-view';

const createOptionTemplate = (name) => `<option value="${name}"></option>`;

const createViewTemplate = ({ type, name, destinationNames}) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
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
      ${destinationNames.map(createOptionTemplate).join('')}
    </datalist>
  </div>`
);

export default class GroupDestinationView extends AbstractStatefulView {
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

    destinationInputElement.addEventListener('focusin', this.#onDestinationInputFocusin);
    destinationInputElement.addEventListener('change', this.#onDestinationInputChange);
  };

  #onDestinationInputFocusin = (evt) => {
    const target = evt.target;

    target.placeholder = target.value;
    target.value = '';

    const onTargetKeydown = () => {
      evt.preventDefault();
    };

    target.addEventListener('focusout', () => {
      target.value = target.placeholder;
      target.removeEventListener('keydown', onTargetKeydown);
    }, { once: true });

    target.addEventListener('keydown', onTargetKeydown);
  };

  #onDestinationInputChange = (evt) => {
    evt.preventDefault();

    const name = evt.target.value;

    this.updateElement({ name });
    this._callback?.change(name);
  };
}
