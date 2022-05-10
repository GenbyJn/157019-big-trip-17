import { render, RenderPosition } from '../render.js';

import TripInfoView from '../view/trip-info/trip-info-view.js';
import TripInfoMainView from '../view/trip-info/trip-info-main-view.js';
import TripInfoCostView from '../view/trip-info/trip-info-cost-view.js';

export default class TripInfoPresenter {
  tripInfoView = new TripInfoView();
  tripInfoMainView = new TripInfoMainView();
  tripInfoCostView = new TripInfoCostView();

  init = (container) => {
    const {headerTripMainElement} = container;
    render(this.tripInfoView, headerTripMainElement, RenderPosition.AFTERBEGIN);
    render(this.tripInfoMainView, this.tripInfoView.getElement());
    render(this.tripInfoCostView, this.tripInfoView.getElement());
  };
}
