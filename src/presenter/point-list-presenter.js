import { render } from '@/render';

import PointListView from '@view/point-list-view.js';
import PointListItemView from '../view/point-list-item-view';
import EditPointView from '@view/edit-point/edit-point-view.js';

export default class PointListPresenter {
  #pointListView = new PointListView();
  #editPointView = null;
  #pointModel = null;
  #points = [];

  init (container) {
    const { mainTripEventsElement, pointModel } = container;

    this.#pointModel = pointModel;
    this.#points = [...this.#pointModel.points];

    this.#editPointView = new EditPointView(this.#points[0]);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderEditPoint(this.#points[i]);
    }

    render(this.#pointListView, mainTripEventsElement);

  }

  #renderEditPoint = (point) => {
    const pointItemView = new PointListItemView(point);
    const editPointView = new EditPointView(point);

    const replacePointToEditPoint = () => {
      this.#pointListView.element.replaceChild(editPointView.element, pointItemView.element);
    };

    const replaceEditPointToPoint = () => {
      this.#pointListView.element.replaceChild(pointItemView.element, editPointView.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
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
