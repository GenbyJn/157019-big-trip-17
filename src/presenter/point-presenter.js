import { render, replace, remove } from '@framework/render';
import { isEscapeKey } from '@util/common';

import { UserAction, UpdateType } from '@/const';

import PointListItemView from '@view/point-list-item-view';
import EditPointView from '@view/edit-point/edit-point-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class PointPresenter {
  #containerElement = null;
  #changeAction = null;
  #pointService = null;

  #pointItemComponent = null;
  #editPointComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor(containerElement, changeAction, pointService) {
    this.#containerElement = containerElement;
    this.#changeAction = changeAction;
    this.#pointService = pointService;
  }

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.setPending({
        isSaving: true,
        isDisabled: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.setPending({
        isDeleting: true,
        isDisabled: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointItemComponent.shake();
      return;
    }

    this.#editPointComponent.shake(() => {
      this.#editPointComponent.setPending({
        isDeleting: false,
        isSaving: false,
        isDisabled: false,
      });
    });
  };

  init = (point) => {
    this.#point = point;

    const prevPointItemComponent = this.#pointItemComponent;
    const prevEditPointComponent = this.#editPointComponent;

    const selectedOffers = this.#pointService.getOffersByIds(point.type, point.offers);

    this.#pointItemComponent = new PointListItemView(point, selectedOffers);
    this.#editPointComponent = new EditPointView(point, this.#pointService);

    this.#pointItemComponent.setRollupButtonClickHandler(this.#handlePointRollupClick);
    this.#pointItemComponent.setFavoriteButtonClickHandler(this.#handleFavoriteButtonClick);
    this.#editPointComponent.setRollupButtonClickHandler(this.#handleEditRollupClick);
    this.#editPointComponent.setSaveButtonClickHandler(this.#handleSaveButtonClick);
    this.#editPointComponent.setDeleteButtonClickHandler(this.#handleDeleteButtonClick);

    if (prevEditPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointItemComponent, this.#containerElement);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointItemComponent, prevPointItemComponent);
    }

    if (this.#mode === Mode.EDITING) {
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
    this.#changeAction(
      UserAction.CHANGE_VIEW,
      UpdateType.PATCH,
      null,
    );

    replace(this.#editPointComponent, this.#pointItemComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.EDITING;
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

  #handleSaveButtonClick = (point) => {
    this.#changeAction(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteButtonClick = () => {
    this.#changeAction(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      this.#point,
    );
  };

  #handleFavoriteButtonClick = () => {
    this.#changeAction(
      UserAction.UPDATE_POINT,
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

export default PointPresenter;
