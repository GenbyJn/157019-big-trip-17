import AbstractView from '@view/abstract-view';

const createPointListTemplate = () => '<ul class="trip-events__list"> </ul>';

export default class PointListView extends AbstractView {
  #element = null;

  get template() {
    return createPointListTemplate();
  }
}
