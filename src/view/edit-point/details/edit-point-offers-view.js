import AbstractStatefulView from '@/framework/view/abstract-stateful-view';

const createOfferTemplate = ({ id, title, price, isChecked = false }) => (
  `<div class="event__offer-selector">
    <input 
      class="event__offer-checkbox visually-hidden" 
      id="event-offer-${id}" 
      type="checkbox" 
      name="event-offer" 
      data-id=${id}
      data-title=${title}
      data-price=${price}
      ${isChecked ? 'checked' : ''}
    >
    <label class="event__offer-label" for="event-offer-${id}">
      <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`
);

const createViewTemplate = ({ availableOffers, hasOffers = false }) => (
  `<section class="event__section event__section--offers ${hasOffers ? '' : 'visually-hidden'}">
    <h3 class="event__section-title event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${availableOffers.map(createOfferTemplate).join('')}
    </div>
  </section>`
);

export default class EditPointDetailsOffersView extends AbstractStatefulView {
  constructor({ availableOffers, hasOffers }) {
    super();

    this._state = { availableOffers, hasOffers };
  }
  
  get template() {
    return createViewTemplate(this._state);
  }

  get state() {
    const offersElements = this.element.querySelectorAll('.event__offer-checkbox:checked');

    const offers = [];
    offersElements.forEach(({ dataset }) => {
      const { id, title, price } = dataset;
      offers.push({ id, title, price});
    })

    return {
      offers,
    };
  }

   _restoreHandlers = () => { };
}
