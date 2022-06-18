import AbstractStatefulView from '@/framework/view/abstract-stateful-view';

const createGroupDestinationTemplate = ({ pointDestination, type, id }) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-${id}">
    ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${pointDestination}" list="destination-list-${id}">
    <datalist id="destination-list-${id}"> 
    <option value="${ pointDestination }"></option>
    </datalist>
  </div>`
);

export default class GroupDestinationView extends AbstractStatefulView {
  _state = {};

  constructor({ pointDestination, type, id }) {
    super();
    this._state = { pointDestination, type, id };

    this.element.querySelector('.event__input--destination')
      .addEventListener('click', this.pointDestinationChangeHandler);
  }

  get template() {
    return createGroupDestinationTemplate(this._state);
  }

  pointDestinationChangeHandler(evt) {

    const point = evt.target.value;

    this._state = {
      ...this._state,
      point,
    };
  }
}
