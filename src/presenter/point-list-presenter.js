import { render } from '../framework/render';
import { isEscapeKey } from '@/util/util';

import PointListView from '@view/point-list-view';
import PointListItemView from '@view/point-list-item-view';
import EditPointView from '@view/edit-point/edit-point-view';
import ListEmptyView from '@view/list-empty-view';

export default class PointListPresenter {
  #mainPointsElement = null;
  #pointModel = null;

  #pointListView = new PointListView();
  #editPointView = null;
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
    const pointItemView = new PointListItemView(point);
    const editPointView = new EditPointView(point);

    const replacePointToEditPoint = () => {
      this.#pointListView.element.replaceChild(editPointView.element, pointItemView.element);
    };

    const replaceEditPointToPoint = () => {
      this.#pointListView.element.replaceChild(pointItemView.element, editPointView.element);
    };

    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceEditPointToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointItemView.setClickHandler(() => {
      replacePointToEditPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointView.setClickHandler(() => {
      replaceEditPointToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editPointView.setSubmitHandler(() => {
      replaceEditPointToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointItemView, this.#pointListView.element);
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
