import AbstractView from '@view/abstract-view.js';
import { useChildrenView } from '@view/use-children-view.js';

import HeaderView from '@edit-point-header/header-view.js';
import WrapperView from '@edit-point-header/point-type-button/edit-point-type-wrapper-view.js';
import TypeButtonView from '@edit-point-header/point-type-button/edit-point-type-button-view.js';
import TypeToggleView from '@edit-point-header/point-type-button/edit-point-type-toggle-view.js';
import TypeListView from '@edit-point-header/point-type-button/edit-point-type-list-view.js';
import TypeItemView from '@edit-point-header/point-type-button/edit-point-type-item-veiw.js';
import GroupDestinationView from '@edit-point-header/field-group/field-group-destination-view';
import GroupTimeView from '@edit-point-header/field-group/field-group-time-view';
import GroupPriceView from '@edit-point-header/field-group/field-group-price-view';
import SaveButtonView from '@edit-point-header/operation-buttons/save-button-view';
import ResetButtonView from '@edit-point-header/operation-buttons/reset-button-view';
import RollupButtonView from '@edit-point-header/operation-buttons/rollup-button-view';
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
    this.addChild('wrapper', {view: WrapperView, selector: '.event__header'});
    this.addChild('typeButtom', {view: TypeButtonView, selector: '.event__type-wrapper'});
    this.addChild('typeToggle', {view: TypeToggleView, selector: '.event__type-wrapper'});
    this.addChild('typeList', {view: TypeListView, selector: '.event__type-wrapper'});
    this.addChild('typeItem', {view: TypeItemView, selector: '.event__type-list'});
    this.addChild('groupDestination', {view: GroupDestinationView, selector: '.event__header'});
    this.addChild('groupTime', {view: GroupTimeView, selector: '.event__header'});
    this.addChild('groupPrice', {view: GroupPriceView, selector: '.event__header'});
    this.addChild('saveButton', {view: SaveButtonView, selector: '.event__header'});
    this.addChild('resetButton', {view: ResetButtonView, selector: '.event__header'});
    this.addChild('rollupButton', {view: RollupButtonView, selector: '.event__header'});
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
