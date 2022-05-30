import { render, RenderPosition } from '@/render';

import PointListView from '@view/point-list-view.js';
import PointListItemView from '../view/point-list-item-view';
import EditPointView from '@view/edit-point/edit-point-view.js';

export default class PointListPresenter {
  #pointListView = new PointListView();
  #pointListItemView = null;
  #editPointView = null;
  #pointModel = null;
  #points = [];

  init = (container) => {
    const {mainTripEventsElement, pointModel} = container;

    this.#pointModel = pointModel;
    this.#points = [...this.#pointModel.points];

    this.#editPointView = new EditPointView(this.#points[0]);

    render(this.#editPointView, this.#pointListView.element, RenderPosition.AFTERBEGIN);

    this.#points.forEach((point) => {
      render(new PointListItemView(point), this.#pointListView.element);
    });
    //render(this.#pointListItemView.element, this.#pointListView.element);
    render(this.#pointListView, mainTripEventsElement);

  };
}
