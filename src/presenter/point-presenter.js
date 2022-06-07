import { render, replace } from '../framework/render';

import { isEscapeKey } from '@/util/util';
import PointListItemView from '@view/point-list-item-view';
import EditPointView from '@view/edit-point/edit-point-view';

export default class PointPresenter {
  #pointListView = null;

  #pointItemComponent = null;
  #editPointComponent = null;

  #point = null;

  constructor(pointListView) {
    this.#pointListView = pointListView;
  }

  init = (point) => {
    this.#point = point;

    this.#pointItemComponent = new PointListItemView(point);
    this.#editPointComponent = new EditPointView(point);

    this.#pointItemComponent.setRollupButtonClickHandler(this.#handlePointRollupClick);
    this.#editPointComponent.setRollupButtonClickHandler(this.#handleEditRollupClick);
    this.#editPointComponent.setSubmitHandler(this.#handleFormSubmit);

    render(this.#pointItemComponent, this.#pointListView);
  };

  #replacePointToEditPoint = () => {
    replace(this.#editPointComponent, this.#pointItemComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceEditPointToPoint = () => {
    replace(this.#pointItemComponent, this.#editPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceEditPointToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handlePointRollupClick = () => {
    this.#replacePointToEditPoint();
  };

  #handleEditRollupClick = () => {
    this.#replaceEditPointToPoint();
  };

  #handleFormSubmit = () => {
    this.#replaceEditPointToPoint();
  };
}


