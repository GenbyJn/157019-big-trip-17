import AbstractView from '@view/abstract-view';

const createSaveButtonTemplate = () =>  '<button class="event__save-btn btn btn--blue" type="submit">Save</button>';

export default class SaveButtonView extends AbstractView {
  #element = null;

  get template() {
    return createSaveButtonTemplate();
  }
}

