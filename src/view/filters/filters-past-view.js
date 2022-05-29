import AbstractView from '@view/abstract-view';

const createTripFiltersPastTemplate = () =>(
  `<div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>`
);

export default class TripFiltersPastView extends AbstractView {
  #element = null;

  get template() {
    return createTripFiltersPastTemplate();
  }
}
