import AbstractView from '@/framework/view/abstract-view';

const createTripFiltersViewTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class TripFiltersView extends AbstractView {

  get template() {
    return createTripFiltersViewTemplate();
  }
}
