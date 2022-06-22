import AbstractView from '@framework/view/abstract-view';

const createViewTemplate = () => '<section class="event__details"></section>';

class EditPointDetailsView extends AbstractView{
  get template() {
    return createViewTemplate();
  }
}

export default EditPointDetailsView;
