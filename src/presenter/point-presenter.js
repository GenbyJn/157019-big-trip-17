import { render, replace, remove } from '@/framework/render';

import { isEscapeKey } from '@/util/util';
import PointListItemView from '@view/point-list-item-view';
import EditPointView from '@view/edit-point/edit-point-view';

import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITTING: 'EDITTING',
};

export default class PointPresenter {
  #containerElement = null;
  #changeData = null;
  #changeMode = null;

  #pointItemComponent = null;
  #editPointComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor(containerElement, changeData, changeMode) {
    this.#containerElement = containerElement;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
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
      render(this.#pointItemComponent, this.#containerElement);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointItemComponent, prevPointItemComponent);
    }

    if (this.#mode === Mode.EDITTING) {
      replace(this.#editPointComponent, prevEditPointComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointItemComponent);
    remove(prevEditPointComponent);
  };

  destroy = () => {
    remove(this.#pointItemComponent);
    remove(this.#editPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditPointToPoint();
    }
  };

  #replacePointToEditPoint = () => {
    this.#changeMode();

    replace(this.#editPointComponent, this.#pointItemComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.EDITTING;
  };

  #replaceEditPointToPoint = () => {
    this.#editPointComponent.reset(this.#point);

    replace(this.#pointItemComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #handlePointRollupClick = () => {
    this.#replacePointToEditPoint();
  };

  #handleEditRollupClick = () => {
    this.#replaceEditPointToPoint();
  };

  #handleFormSubmit = (point) => {
    // dayjs.isSameDate
    const isUpdateDate = this.#point.dateFrom.toISOString() === point.dateFrom.toISOString()
      || this.#point.dateTo.toISOString() === point.dateTo.toISOString();

    this.#changeData(
      UserAction.UPDATE_POINT,
      isUpdateDate ? UpdateType.MINOR : UpdateType.PATCH,
      point,
    );

    this.#replaceEditPointToPoint();
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT, // TOGGLE_FAVORITE
      UpdateType.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite },
    );
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceEditPointToPoint();
    }
  };
}
