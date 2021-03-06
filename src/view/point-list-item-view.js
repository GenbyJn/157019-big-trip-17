import AbstractView from '@framework/view/abstract-view';

import { formatMonthDate, formatTimeDate, formatEventDuration } from '@util/date';

const createOfferTemplate = ({ title, price }) => (
  `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
   </li>`
);

const createViewTemplate = (point, selectedOffers) => {
  const { basePrice, dateFrom, dateTo, isFavorite, type, destination: { name } } = point;

  const offersTemplate = selectedOffers.map(createOfferTemplate).join('');
  const eventDuration = formatEventDuration(dateFrom, dateTo);

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
      <time class="event__date" datetime="${dateFrom?.toISOString()}">${formatMonthDate(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom?.toISOString()}">${dateStart}</time>
          —
          <time class="event__end-time" datetime="${dateTo?.toISOString()}">${dateEnd}</time>
        </p>
        <p class="event__duration">${eventDuration}</p>
      </div>
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersTemplate}
      </ul>
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

class PointListItemView extends AbstractView {
  #point = null;
  #selectedOffers = [];

  constructor(point, selectedOffers) {
    super();

    this.#point = point;
    this.#selectedOffers = selectedOffers;
  }

  get template() {
    return createViewTemplate(this.#point, this.#selectedOffers);
  }

  setRollupButtonClickHandler = (callback) => {
    this._callback.clickRollup = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);
  };

  setFavoriteButtonClickHandler = (callback) => {
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

export default PointListItemView;
