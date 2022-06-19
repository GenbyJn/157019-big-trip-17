import AbstractView from '@/framework/view/abstract-view';
import { formatMonthDate, formatTimeDate, formatDuration } from '@/util/date';

const createPointListItemTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, isFavorite, type, destination: { name } } = point;

  const eventDuration = formatDuration(dateTo - dateFrom);

  const dateStart = dateFrom !== null
    ? formatTimeDate(dateFrom)
    : '';
  const dateEnd = dateTo !== null
    ? formatTimeDate(dateTo)
    : '';

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom.toISOString()}">${formatMonthDate(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom.toISOString()}">${dateStart}</time>
          —
          <time class="event__end-time" datetime="${dateTo.toISOString()}">${dateEnd}</time>
        </p>
        <p class="event__duration">${eventDuration}</p>
      </div>
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <button class="${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
  </div>
</li>`
  );
};

export default class PointListItemView extends AbstractView {
  #point = null;

  constructor(point) {
    super();

    this.#point = point;
  }

  get template() {
    return createPointListItemTemplate(this.#point);
  }

  setRollupButtonClickHandler = (callback) => {
    this._callback.clickRollup = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.clickFavorite = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favotiteButtonClickHandler);
  };

  #rollupButtonClickHandler = (evt) => {
    this._callback.clickRollup();
    evt.preventDefault();
  };

  #favotiteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickFavorite();
  };
}
