import AbstractView from '@view/abstract-view';

const createInfoTemplate = () => (
  '<section class="trip-main__trip-info  trip-info"></section>'
);

export default class InfoView extends AbstractView {

  get template() {
    return createInfoTemplate();
  }
}
