import { render, replace, remove } from '../framework/render';

import { isEscapeKey } from '@/util/util';
import PointListItemView from '@view/point-list-item-view';
import EditPointView from '@view/edit-point/edit-point-view';

export default class PointPresenter {
  #pointListView = null;
  #changeData = null;

  #pointItemComponent = null;
  #editPointComponent = null;

  #point = null;

  constructor(pointListView, changeData) {
    this.#pointListView = pointListView;
    this.#changeData = changeData;
  }

  init = (point) => {
    this.#point = point;

    const prevPointItemComponent = this.#pointItemComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointItemComponent = new PointListItemView(point);
    this.#editPointComponent = new EditPointView(point);

    this.#pointItemComponent.setRollupButtonClickHandler(this.#handlePointRollupClick);
    this.#pointItemComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editPointComponent.setRollupButtonClickHandler(this.#handleEditRollupClick);
    this.#editPointComponent.setSubmitHandler(this.#handleFormSubmit);

    if (prevEditPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointItemComponent, this.#pointListView);
      return;
    }

    if (this.#pointListView.contains(prevPointItemComponent.element)) {
      replace(this.#pointItemComponent, prevPointItemComponent);
    }

    if (this.#pointListView.contains(prevEditPointComponent.element)) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointItemComponent);
    remove(prevEditPointComponent);
  };

  destroy = () => {
    remove(this.#pointItemComponent);
    remove(this.#editPointComponent);
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

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceEditPointToPoint();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

}


