import { render } from '../framework/render';

import PointListView from '@view/point-list-view';
import PointPresenter from './point-presenter';
import ListEmptyView from '@view/list-empty-view';
import { updateItem } from '../util/util';

export default class PointListPresenter {
  #mainPointsElement = null;
  #pointModel = null;

  #pointListView = new PointListView();
  #points = [];
  #pointPresenter = new Map();

  constructor(pointModel) {
    this.#pointModel = pointModel;

  }

  init (mainElement) {
    this.#mainPointsElement = mainElement;
    this.#points = [...this.#pointModel.points];

    this.#renderPointList();
  }

  #handlePointChange = (updatePoint) => {
    this.#points = updateItem(this.#points, updatePoint);
    this.#pointPresenter.get(updatePoint.id).init(updatePoint);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListView.element, this.#handlePointChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPointList = () => {
    if (this.#points.length === 0 ) {
      render(new ListEmptyView(),  this.#mainPointsElement);
      return;
    }

    this.#points.forEach((point)=> {
      this.#renderPoint(point);
    });

    render(this.#pointListView, this.#mainPointsElement);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
