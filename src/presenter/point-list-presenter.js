import { render } from '@/render';
import { isEscapeKey } from '@/util/util';

import PointListView from '@view/point-list-view';
import PointListItemView from '@view/point-list-item-view';
import EditPointView from '@view/edit-point/edit-point-view';
import ListEmptyView from '@view/list-empty-view';

export default class PointListPresenter {
  #pointListView = new PointListView();
  #editPointView = null;
  #pointModel = null;
  #points = [];

  init (container) {
    const { mainTripEventsElement, pointModel } = container;

    this.#pointModel = pointModel;
    this.#points = [...this.#pointModel.points];

    if (this.#points.length === 0 ) {
      render(new ListEmptyView(),  mainTripEventsElement);
    }


    this.#points.forEach((point)=> {
      this.#renderPoint(point);
    });

    render(this.#pointListView, mainTripEventsElement);

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

    pointItemView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditPointToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editPointView.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditPointToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointItemView, this.#pointListView.element);
  };

}
