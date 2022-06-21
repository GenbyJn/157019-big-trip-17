import { render, remove, RenderPosition } from '@framework/render';
import { isEscapeKey } from '@util/common';

import { UserAction, UpdateType } from '@/const';

import EditPointView from '@view/edit-point/edit-point-view';

const createNewPoint = () => ({
  type: 'taxi',
  basePrice: 1,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  isFavorite: false,
  offers: [],
});

class PointPresenter {
  #containerElement = null;
  #changeAction = null;
  #pointService = null;

  #editPointComponent = null;
  #destroyCallback = null;

  constructor(containerElement, changeAction, pointService) {
    this.#containerElement = containerElement;
    this.#changeAction = changeAction;
    this.#pointService = pointService;
  }

  setSaving = () => {
    this.#editPointComponent.setPending({
      isSaving: true,
      isDisabled: true,
    });
  };

  setAborting = () => {
    this.#editPointComponent.shake(() => {
      this.#editPointComponent.setPending({
        isSaving: false,
        isDisabled: false,
      });
    });
  };

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView(createNewPoint(), this.#pointService);

    this.#editPointComponent.setSaveButtonClickHandler(this.#handleSaveButtonClick);
    this.#editPointComponent.setCancelButtonClickHandler(this.#handleCancelButtonClick);

    render(this.#editPointComponent, this.#containerElement, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#editPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleSaveButtonClick = (point) => {

    this.#changeAction(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleCancelButtonClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}

export default PointPresenter;
