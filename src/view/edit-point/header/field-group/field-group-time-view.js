import AbstractStatefulView from '@/framework/view/abstract-stateful-view';
import { completeDateFormat } from '@/util/date';
import { setFlatpickr } from '@/util/flatpickr';

const createGroupTimeTemplate = (point) => {
  const { dateFrom, dateTo } = point;

  const dateStart = dateFrom !== null
    ? completeDateFormat(dateFrom)
    : '';

  const dateEnd = dateTo !== null
    ? completeDateFormat(dateTo)
    : '';

  return (
    `<div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
    </div>`
  );};

export default class GroupTimeView extends AbstractStatefulView {
  #startDatepicker = null;
  #endDatepicker = null;

  constructor({ dateFrom, dateTo }) {
    super();

    this._state = { dateFrom, dateTo };

    this._restoreHandlers();
  }

  get template() {
    return createGroupTimeTemplate(this._state);
  }

  get dates() {
    return this._state;
  }

  removeElement = () => {
    super.removeElement();

    if (this.#startDatepicker !== null) { // if (this.#startDatepicker) { ... }
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }

    if (this.#endDatepicker !== null) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }
  };

  _restoreHandlers = () => {
    const { dateFrom, dateTo } = this._state;

    const element = this.element;

    this.#startDatepicker = setFlatpickr(element.querySelector('#event-start-time-1'), {
      defaultDate: dateFrom,
      maxDate: dateTo,
      onClose: this.#startDatepickerCloseHandler,
    });

    this.#endDatepicker = setFlatpickr(element.querySelector('#event-end-time-1'), {
      defaultDate: dateTo,
      minDate: dateFrom,
      onClose: this.#endtDatepickerCloseHandler,
    });
  };

  #startDatepickerCloseHandler = ([dateFrom]) => {
    this.#endDatepicker.set('minDate', dateFrom);
    this._setState({ dateFrom });
  };

  #endtDatepickerCloseHandler = ([dateTo]) => {
    this.#startDatepicker.set('maxDate', dateTo);
    this._setState({ dateTo });
  };
}
