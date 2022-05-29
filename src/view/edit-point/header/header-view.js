import AbstractView from '@view/abstract-view';

const createEditPointHeaderTemplate = () => '<header class="event__header"></header>';

export default class EditPointHeaderView extends AbstractView {
  #element = null;

  get template() {
    return createEditPointHeaderTemplate();
  }
}


