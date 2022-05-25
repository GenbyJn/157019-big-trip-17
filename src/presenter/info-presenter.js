import { render, RenderPosition } from '../render.js';

import InfoView from '../view/info/trip-info-view.js';
import InfoMainView from '../view/info/info-main-view.js';
import InfoCostView from '../view/info/info-cost-view.js';

export default class InfoPresenter {
  tripInfoView = new InfoView();
  tripInfoMainView = new InfoMainView();
  tripInfoCostView = new InfoCostView();

  init = (container) => {
    const {headerTripMainElement} = container;
    render(this.tripInfoView, headerTripMainElement, RenderPosition.AFTERBEGIN);
    render(this.tripInfoMainView, this.tripInfoView.getElement());
    render(this.tripInfoCostView, this.tripInfoView.getElement());
  };
}
