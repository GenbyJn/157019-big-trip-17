import AbstractView from '@view/abstract-view';

const createEditPointDetailsTemplate = () => '<section class="event__details"></section>';

export default class EditPointDetailsView extends AbstractView{

  get template() {
    return createEditPointDetailsTemplate();
  }
}


