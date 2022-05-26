import AbstractView from '@view/abstract-view';
import { useChildrenView } from '@view/use-children-view';
import {camalizeFirstCharacter} from '../../util';
import { POINT_TYPES } from '@/const';

import HeaderView from '@edit-point-header/header-view';
import WrapperView from '@edit-point-header/point-type-button/edit-point-type-wrapper-view';
import TypeListView from '@edit-point-header/point-type-button/edit-point-type-list-view';
import GroupDestinationView from '@edit-point-header/field-group/field-group-destination-view';
import GroupTimeView from '@edit-point-header/field-group/field-group-time-view';
import GroupPriceView from '@edit-point-header/field-group/field-group-price-view';
import SaveButtonView from '@edit-point-header/operation-buttons/save-button-view';
import ResetButtonView from '@edit-point-header/operation-buttons/reset-button-view';
import RollupButtonView from '@edit-point-header/operation-buttons/rollup-button-view';
import DetailsView from '@view/edit-point/details/edit-point-details-view';
import OffersView from '@view/edit-point/details/edit-point-offers-view';
import DestinationView from '@view/edit-point/details/edit-point-destination-view';

const createEditPointTemplate = () => (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    </form>
  </li>`
);

export default class EditPointView extends useChildrenView(AbstractView) {
  constructor(point) {
    super();

    const isNewMode = point.id === undefined; // Boolean(point.id)
    const types = POINT_TYPES.map((pointType) => ({
      id: pointType,
      text: camalizeFirstCharacter(pointType),
      isChecked: pointType === point.type,
    }));

    this._state = {
      ...point,
      resetButtonText: isNewMode ? 'Cancel' : 'Delete',
      types,
    };

    this.addChild('header', {view: HeaderView, selector: '.event--edit'});
    this.addChild('wrapper', {view: WrapperView, selector: '.event__header'});
    this.addChild('typeList', {view: TypeListView, selector: '.event__type-wrapper'});
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
    this.setChildRender('rollupButton', !!this._state.id); // this._state.isNewMode
    this.setChildRender('offers', this._state.offers.length > 0);

    return createEditPointTemplate(this._state);
  }

  setTypeChangeHandler(callback) {
    this._children.header.setChangeHandler(callback);
  }
}
