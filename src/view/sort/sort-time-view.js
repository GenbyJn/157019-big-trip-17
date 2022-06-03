import AbstractView from '@/framework/view/abstract-view';

const createSortTimeTemplate = () =>(
  `<div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
    <label class="trip-sort__btn" for="sort-time">Time</label>
  </div>`
);

export default class SortTimeView extends AbstractView {

  get template() {
    return createSortTimeTemplate();
  }
}
