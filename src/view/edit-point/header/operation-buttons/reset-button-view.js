import AbstractStatefulView from '@framework/view/abstract-stateful-view';

const getDeleteButtonText = (isDeleting) => isDeleting ? 'Deleting...' : 'Delete';

const createResetButtonTemplate = ({ isNewMode, isDeleting = false, isDisabled = false }) => {
  const text = isNewMode
    ? 'Cancel'
    : getDeleteButtonText(isDeleting);

  return (
    `<button 
      class="event__reset-btn" 
      type="reset"
      ${isDisabled ? 'disabled' : ''}
    >${text}</button>`
  );
};

class ResetButtonView extends AbstractStatefulView {
  constructor({ isNewMode, isDeleting, isDisabled }) {
    super();

    this._state = { isNewMode, isDeleting, isDisabled };
  }

  get template() {
    return createResetButtonTemplate(this._state);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  _restoreHandlers = () => {
    this.setClickHandler(this._callback.click);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click?.();
  };
}

export default ResetButtonView;
