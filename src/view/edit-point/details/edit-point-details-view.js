import AbstractView from '@view/abstract-view';

const createEditPointDetailsTemplate = () => '<section class="event__details"></section>';

export default class EditPointDetailsView extends AbstractView{
  #element = null;

  get template() {
    return createEditPointDetailsTemplate();
  }
}


