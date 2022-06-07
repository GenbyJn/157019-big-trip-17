import { render, replace } from '../framework/render';
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
    const pointItemComponent = new PointListItemView(point);
    const editPointComponent = new EditPointView(point);

    const replacePointToEditPoint = () => {
      replace(editPointComponent, pointItemComponent);
    };

    const replaceEditPointToPoint = () => {
      replace(pointItemComponent, editPointComponent);
    };

    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceEditPointToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointItemComponent.setRollupButtonClickHandler(() => {
      replacePointToEditPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.setRollupButtonClickHandler(() => {
      replaceEditPointToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.setSubmitHandler(() => {
      replaceEditPointToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointItemComponent, this.#pointListView.element);
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
