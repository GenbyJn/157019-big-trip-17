import AbstractView from '@/framework/view/abstract-view';

const createSaveButtonTemplate = () =>  '<button class="event__save-btn btn btn--blue" type="submit">Save</button>';

export default class SaveButtonView extends AbstractView {

  get template() {
    return createSaveButtonTemplate();
  }

  setSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element.addEventListener('submit', this.#onSubmit);
  };

  #onSubmit = (evt) => {
    evt.preventDefault();
    this._callback.submit();
  };
}


