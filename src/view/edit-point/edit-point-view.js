import AbstractStatefulView from '@framework/view/abstract-stateful-view';
import { useChildrenView } from '@framework/view/use-children-view';

import { camalizeFirstCharacter } from '@util/common';
import { POINT_TYPES } from '@/const';

import HeaderView from './header/header-view.js';
import WrapperView from './header/point-type-button/edit-point-type-wrapper-view';
import GroupDestinationView from './header/field-group/field-group-destination-view';
import GroupTimeView from './header/field-group/field-group-time-view';
import GroupPriceView from './header/field-group/field-group-price-view';
import SaveButtonView from './header/operation-buttons/save-button-view';
import ResetButtonView from './header/operation-buttons/reset-button-view';
import RollupButtonView from './header/operation-buttons/rollup-button-view';
import DetailsView from './details/edit-point-details-view';
import OffersView from './details/edit-point-offers-view';
import DestinationView from './details/edit-point-destination-view';

const createViewTemplate = () => (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    </form>
  </li>`
);

const checkDestination = ({ description, pictures }) => description !== '' || pictures.length > 0;

const createTypes = (type) => POINT_TYPES.map((pointType) => ({
  id: pointType,
  text: camalizeFirstCharacter(pointType),
  isChecked: pointType === type,
}));

class EditPointView extends useChildrenView(AbstractStatefulView) {
  #pointService = null;

  constructor(point, pointService) {
    super();

    this.#pointService = pointService;

    this._state = EditPointView.parsePointToState(point, pointService);

    this._addChild('header', {view: HeaderView, selector: '.event--edit'});
    this._addChild('wrapper', {view: WrapperView, selector: '.event__header'});
    this._addChild('groupDestination', {view: GroupDestinationView, selector: '.event__header'});
    this._addChild('groupTime', {view: GroupTimeView, selector: '.event__header'});
    this._addChild('groupPrice', {view: GroupPriceView, selector: '.event__header'});
    this._addChild('saveButton', {view: SaveButtonView, selector: '.event__header'});
    this._addChild('resetButton', {view: ResetButtonView, selector: '.event__header'});
    this._addChild('rollupButton', {view: RollupButtonView, selector: '.event__header'});
    this._addChild('details', {view: DetailsView, selector: '.event--edit'});
    this._addChild('offers', {view: OffersView, selector: '.event__details'});
    this._addChild('destination', {view: DestinationView, selector: '.event__details'});

    this.#setInnerHandlers();
  }

  get template() {
    this._setChildRender('rollupButton', ! this._state.isNewMode);
    this._setChildRender('offers', this._state.hasOffers);

    return createViewTemplate(this._state);
  }

  setSaveButtonClickHandler = (callback) => {
    this._callback.save = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setRollupButtonClickHandler = (callback) => {
    this._callback.clickRollup = callback;
    this._children.rollupButton.setClickHandler(callback);
  };

  setDeleteButtonClickHandler = (callback) => {
    this._callback.delete = callback;
  };

  setCancelButtonClickHandler = (callback) => {
    this._callback.cancel = callback;
  };

  setPending = (state) => {
    this._children.saveButton.updateElement(state);
    this._children.resetButton.updateElement(state);
  };

  reset = (point) => {
    this.updateElement(
      EditPointView.parsePointToState(point, this.#pointService),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();

    this.setSaveButtonClickHandler(this._callback.save);
    this.setRollupButtonClickHandler(this._callback.clickRollup);
  };

  #setInnerHandlers = () => {
    this._children.groupDestination.setNameChangeHandler((selectedName) => {
      const destination = this.#pointService.getDestinationByName(selectedName);
      if (destination === null) {
        this._children.groupDestination.setValidity('Select a destination from the list.');
        this._children.destination.updateElement({
          destinationName: '',
          hasDestination: false,
        });
        return;
      }

      this._children.groupDestination.setValidity('');
      this._children.destination.updateElement({
        destinationName: destination.name,
        hasDestination: checkDestination(destination),
      });

      this._state.destination = destination;
    });

    this._children.wrapper.setTypeChangeHandler((type) => {
      const availableOffers = Object.values(this.#pointService.getOffersByType(type));
      const hasOffers = availableOffers.length > 0;

      this._children.offers.updateElement({ availableOffers, hasOffers });
      this._children.groupDestination.updateElement({ type });
    });

    this._children.resetButton.setClickHandler(() => {

      this._callback[this._state.isNewMode ? 'cancel' : 'delete']?.();
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    const { type } = this._children.wrapper.state;
    const { basePrice } = this._children.groupPrice.state;
    const { dateFrom, dateTo } = this._children.groupTime.state;
    const { offers } = this._children.offers.state;

    const point = EditPointView.parseStateToPoint(this._state);

    point.type = type;
    point.basePrice = basePrice;
    point.dateFrom = dateFrom;
    point.dateTo = dateTo;
    point.offers = offers;

    this._callback.save?.(point);
  };

  static parsePointToState = (point, pointService) => {
    const { type, destination, offers } = point;

    const typeOffers = pointService.getOffersByType(type);

    const availableOffers = [];
    Object.values(typeOffers).forEach((typeOffer) => {
      availableOffers.push({
        ...typeOffer,
        isChecked: offers.some((id) => id === typeOffer.id),
      });
    });

    const isNewMode = point.id === undefined;

    return {
      ...point,
      types: createTypes(type),
      availableOffers,
      destinationName: destination.name,
      destinationNames: pointService.getDestinationNames(),
      hasDestination: checkDestination(destination),
      hasOffers: availableOffers.length > 0,
      isNewMode,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  };

  static parseStateToPoint = (state) => {
    const point = { ...state };

    delete point.types;
    delete point.availableOffers;
    delete point.destinationName;
    delete point.destinationNames;
    delete point.hasDestination;
    delete point.hasOffers;
    delete point.isNewMode;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}

export default EditPointView;
