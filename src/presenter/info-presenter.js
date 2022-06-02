import { render, RenderPosition } from '@/render.js';

import InfoView from '@info/trip-info-view.js';
import InfoMainView from '@info/info-main-view.js';
import InfoCostView from '@info/info-cost-view.js';

export default class InfoPresenter {
  #infoView = new InfoView();
  #infoMainView = new InfoMainView();
  #infoCostView = new InfoCostView();

  init = (container) => {
    const {headerTripMainElement} = container;
    render(this.#infoView, headerTripMainElement, RenderPosition.AFTERBEGIN);
    render(this.#infoMainView, this.#infoView.element);
    render(this.#infoCostView, this.#infoView.element);
  };
}
