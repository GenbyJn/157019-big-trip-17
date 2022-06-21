import AbstractStatefulView from '@framework/view/abstract-stateful-view';

import { formatEventTime } from '@util/date';
import { setFlatpickr } from '@util/flatpickr';

const createTimeInputTemplate = (name, date) => (
  `<input 
    class="event__input event__input--time" 
    id="event-${name}-time-1" 
    type="text" 
    name="event-${name}-time" 
    value="${formatEventTime(date)}"
  >`
);

const createViewTemplate = ({ dateFrom, dateTo }) => (
  `<div class="event__field-group event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    ${createTimeInputTemplate('start', dateFrom)}
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    ${createTimeInputTemplate('end', dateTo)}
  </div>`
);

class GroupTimeView extends AbstractStatefulView {
  #startDatepicker = null;
  #endDatepicker = null;

  constructor({ dateFrom, dateTo }) {
    super();

    this._state = { dateFrom, dateTo };

    this._restoreHandlers();
  }

  get template() {
    return createViewTemplate(this._state);
  }

  get state() {
    const [dateFrom] = this.#startDatepicker?.selectedDates ?? [null];
    const [dateTo] = this.#endDatepicker?.selectedDates ?? [null];

    return {
      dateFrom,
      dateTo,
    };
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
    const startTimeInputElement = element.querySelector('#event-start-time-1');
    const endTimeInputElement = element.querySelector('#event-end-time-1');

    this.#startDatepicker = setFlatpickr(startTimeInputElement, {
      defaultDate: dateFrom,
      maxDate: dateTo,
      onClose: this.#startDatepickerCloseHandler,
    });

    this.#endDatepicker = setFlatpickr(endTimeInputElement, {
      defaultDate: dateTo,
      minDate: dateFrom,
      onClose: this.#endtDatepickerCloseHandler,
    });

    startTimeInputElement.addEventListener('keydown', this.#timeInputKeydownHandler);
    endTimeInputElement.addEventListener('keydown', this.#timeInputKeydownHandler);
  };

  #startDatepickerCloseHandler = ([dateFrom]) => {
    this.#endDatepicker.set('minDate', dateFrom);
    this._setState({ dateFrom });
  };

  #endtDatepickerCloseHandler = ([dateTo]) => {
    this.#startDatepicker.set('maxDate', dateTo);
    this._setState({ dateTo });
  };

  #timeInputKeydownHandler = (evt) => {
    evt.preventDefault();
  };
}

export default GroupTimeView;
