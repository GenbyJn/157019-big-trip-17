import AbstractStatefulView from '@/framework/view/abstract-stateful-view';
import { useChildrenView } from '@/framework/view/use-children-view';
import { camalizeFirstCharacter } from '@/util/util'; // @/util/common
import { POINT_TYPES } from '@/const';

import { createDestinations } from '@/mock/destination';
import { createOffers } from '@/mock/offers';

const destinations = createDestinations();
const offers = createOffers();

import HeaderView from '@edit-point-header/header-view';
import WrapperView from '@edit-point-header/point-type-button/edit-point-type-wrapper-view';
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

const checkDestination = ({ description, pictures }) => description !== '' || pictures.length > 0;

export default class EditPointView extends useChildrenView(AbstractStatefulView) {
  #destinations = [];
  #offers = [];

  constructor(point) {
    super();

    this._state = EditPointView.parsePointToState(point, destinations, offers);
    this.#destinations = destinations;
    this.#offers = offers;

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
    this._addChild('destination', {view: DestinationView, selector: '.event__details', state: 'destination'});

    this.#setInnerHandlers();
  }

  get template() {
    this._setChildRender('rollupButton', !!this._state.id); // this._state.isNewMode
    this._setChildRender('offers', this._state.offers.length > 0);

    return createEditPointTemplate(this._state);
  }

  setSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitClickHandler);
  };

  setRollupButtonClickHandler = (callback) => {
    this._callback.clickRollup = callback;
    this._children.rollupButton.setClickHandler(callback);
  };

  reset = (point) => {
    this.updateElement(
      EditPointView.parsePointToState(point, this.#destinations, this.#offers),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();

    this.setSubmitHandler(this._callback.submit);
    this.setRollupButtonClickHandler(this._callback.clickRollup);
  };

  #setInnerHandlers = () => {
    this._children.groupDestination.setNameChangeHandler((name) => {
      const destination = destinations.find((destination) => destination.name === name);

      this._children.destination.updateElement({
        ...destination,
        hasDestination: checkDestination(destination),
      });

      this._state.destination = destination;
    });

    this._children.wrapper.setTypeChangeHandler((type) => {
      const availableOffers = this.#offers.find((offer) => offer.type === type)?.offers ?? [];
      const hasOffers = availableOffers.length > 0;

      this._children.offers.updateElement({ availableOffers, hasOffers });
    });
  };

  #submitClickHandler = (evt) => {
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

    this._callback.submit?.(point);
  };

  static parsePointToState = (point, destinations, allOffers) => {
    const isNewMode = point.id === undefined; // Boolean(point.id)
    const types = POINT_TYPES.map((pointType) => ({
      id: pointType,
      text: camalizeFirstCharacter(pointType),
      isChecked: pointType === point.type,
    }));

    const {
      type,
      destination,
      offers,
    } = point;

    const typeOffers = allOffers.find((offer) => offer.type === type)?.offers ?? [];

    const availableOffers = [];
    typeOffers.forEach((typeOffer) => {
      availableOffers.push({
        ...typeOffer,
        isChecked: offers.some(({ id }) => id === typeOffer.id),
      });
    });

    return {
      ...point,
      types,
      availableOffers,
      resetButtonText: isNewMode ? 'Cancel' : 'Delete',
      destinationNames: destinations.map(({ name }) => name),
      hasDestination: checkDestination(destination),
      hasOffers: availableOffers.length > 0,
    };
  };

  static parseStateToPoint = (state) => {
    const point = { ...state };

    delete point.destinationNames;
    delete point.availableOffers;
    delete point.resetButtonText;
    delete point.hasDestination;
    delete point.hasOffers;
    delete point.isNew;

    return point;
  };
  /*
  static parseStateToPoint = (state) => {
    const { type, resetButtonText, ...point } = { ...state };

    delete point.types;
  };
**/
}
