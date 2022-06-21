import AbstractView from '@framework/view/abstract-view';

const createViewTemplate = () => '<header class="event__header"></header>';

class EditPointHeaderView extends AbstractView {
  get template() {
    return createViewTemplate();
  }
}

export default EditPointHeaderView;
