import { render } from '../framework/render';


import PointListView from '@view/point-list-view';
import PointPresenter from './point-presenter';
import ListEmptyView from '@view/list-empty-view';

export default class PointListPresenter {
  #mainPointsElement = null;
  #pointModel = null;

  #pointListView = new PointListView();
  #points = [];

  constructor(pointModel) {
    this.#pointModel = pointModel;

  }

  init (mainElement) {
    this.#mainPointsElement = mainElement;
    this.#points = [...this.#pointModel.points];

    this.#renderPointList();
  }

  #renderPoint = (point) => {

    const pointPresenter = new PointPresenter(this.#pointListView.element);
    pointPresenter.init(point);
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
}
