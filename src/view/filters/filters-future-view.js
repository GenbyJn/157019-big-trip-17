import AbstractView from '@view/abstract-view';

const createTripFiltersFutureTemplate = () =>(
  `<div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>`
);

export default class TripFiltersFutureView extends AbstractView {

  get template() {
    return createTripFiltersFutureTemplate();
  }
}
