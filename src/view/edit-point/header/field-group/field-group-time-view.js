import AbstractStatefulView from '@/framework/view/abstract-stateful-view';
import { completeDateFormat } from '@/util/date';

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
)};

export default class GroupTimeView extends AbstractStatefulView{

  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createGroupTimeTemplate(this.#point);
  }
}
