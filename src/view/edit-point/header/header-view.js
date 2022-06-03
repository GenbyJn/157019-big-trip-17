import AbstractView from '@/framework/view/abstract-view';

const createEditPointHeaderTemplate = () => '<header class="event__header"></header>';

export default class EditPointHeaderView extends AbstractView {

  get template() {
    return createEditPointHeaderTemplate();
  }
}


