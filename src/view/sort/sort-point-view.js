import AbstractView from '@/framework/view/abstract-view';

const createSortPointTemplate = () =>(
  `<div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled="">
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>`
);

export default class SortPointView extends AbstractView {

  get template() {
    return createSortPointTemplate();
  }
}
