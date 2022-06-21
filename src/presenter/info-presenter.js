import { render, RenderPosition } from '@framework/render';

import InfoView from '@view/info/trip-info-view';
import InfoMainView from '@view/info/info-main-view';
import InfoCostView from '@view/info/info-cost-view';

class InfoPresenter {
  #infoView = new InfoView();
  #infoMainView = new InfoMainView();
  #infoCostView = new InfoCostView();

  init = (containerElement) => {
    render(this.#infoView, containerElement, RenderPosition.AFTERBEGIN);
    render(this.#infoMainView, this.#infoView.element);
    render(this.#infoCostView, this.#infoView.element);
  };
}

export default InfoPresenter;
