import AbstractView from '@view/abstract-view.js';
import { useChildrenView } from '@view/use-children-view.js';

import HeaderView from '@view/edit-point/header/edit-point-header-view.js';
import DetailsView from '@view/edit-point/details/edit-point-details-view.js';
import OffersView from '@view/edit-point/details/edit-point-offers-view.js';
import DestinationView from '@view/edit-point/details/edit-point-destination-view.js';

const createEditPointTemplate = () => (
  `<li class="trip-events__item"><form class="event event--edit" action="#" method="post">
  </form></li>`
);

export default class EditPointView extends useChildrenView(AbstractView) {
  constructor(point) {
    super();

    this._state = point;

    this.addChild('header', {view: HeaderView, selector: '.event--edit'});
    this.addChild('details', {view: DetailsView, selector: '.event--edit'});
    this.addChild('offers', {view: OffersView, selector: '.event__details'});
    this.addChild('destination', {view: DestinationView, selector: '.event__details'});
  }

  getTemplate() {
    return createEditPointTemplate(this._state);
  }

  setTypeChangeHandler(callback) {
    this._children.header.setChangeHandler(callback);
  }
}
