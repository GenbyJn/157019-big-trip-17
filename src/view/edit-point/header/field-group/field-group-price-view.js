import AbstractView from '@/framework/view/abstract-view';

const createViewTemplate = ({ basePrice }) => (
  `<div class="event__field-group event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input 
      class="event__input event__input--price" 
      id="event-price-1" 
      type="number" 
      min="1" 
      name="event-price" 
      value="${basePrice}"
      required
    >
  </div>`
);

export default class GroupPriceView extends AbstractView {
  constructor({ basePrice }) {
    super();

    this._state = { basePrice };
  }
  
  get template() {
    return createViewTemplate(this._state);
  }

  get state() {
    const basePrice = this.element.querySelector('input[name=event-price]').valueAsNumber;
    
    return {
      basePrice,
    };
  }
}
