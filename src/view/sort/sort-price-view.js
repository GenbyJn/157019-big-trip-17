import AbstractView from '@/framework/view/abstract-view';

const createSortPriceTemplate = () =>(
  `<div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>`
);

export default class SortPriceView extends AbstractView {

  get template() {
    return createSortPriceTemplate();
  }
}
