import { render } from '../render.js';

import TripFiltersView from '../view/trip-filters/trip-filters-view.js';
import TripFiltersEverythingView from '../view/trip-filters/trip-filters-everything-view.js';
import TripFiltersFutureView from '../view/trip-filters/trip-filters-future-view.js';
import TripFiltersPastView from '../view/trip-filters/trip-filters-past-view.js';

export default class TripFiltersPresenter {
  tripFiltersView = new TripFiltersView();
  tripFiltersEverythingView = new TripFiltersEverythingView();
  tripFiltersFutureView = new TripFiltersFutureView();
  tripFiltersPastView = new TripFiltersPastView();

  init = (container) => {
    const {headerTripMainFiltersElement} = container;

    render(this.tripFiltersView, headerTripMainFiltersElement);
    render(this.tripFiltersEverythingView, this.tripFiltersView.getElement());
    render(this.tripFiltersFutureView, this.tripFiltersView.getElement());
    render(this.tripFiltersPastView, this.tripFiltersView.getElement());
  };
}
