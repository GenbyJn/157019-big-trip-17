import { render } from '../render';

import TripPointListView from '../view/trip-point-list-view.js';
import TripPointListItemView from '../view/trip-point-list-item-view';
import TripEditPointView from '../view/trip-edit-point/trip-edit-point-view';
import TripEditPointHeaderView from '../view/trip-edit-point/trip-edit-point-header-view';
import TripEditPointDetailsView from '../view/trip-edit-point/trip-edit-point-details-view';
import TripEditPointDetailsOffersView from '../view/trip-edit-point/trip-edit-point-details-offers-view';
import TripEditPointDetailsDestinationView from '../view/trip-edit-point/trip-edit-point-details-destination-view';
import TripPointView from '../view/trip-point-view';

export default class TripPointListPresenter{
  tripPointListView = new TripPointListView();
  tripPointListItemView = new TripPointListItemView();
  tripEditPointView = new TripEditPointView();
  tripEditPointHeaderView = new TripEditPointHeaderView();
  tripEditPointDetailsView = new TripEditPointDetailsView();
  tripEditPointDetailsOffersView = new TripEditPointDetailsOffersView();
  tripEditPointDetailsDestinationView = new TripEditPointDetailsDestinationView();
  tripPointView = new TripPointView();

  init = (container) => {
    const {mainTripEventsElement, tripPointModel} = container;

    this.tripPointModel = tripPointModel;
    this.tripPoints = [...this.tripPointModel.getTripPonts()];

    render(this.tripPointListItemView, this.tripPointListView.getElement());
    render(this.tripEditPointView, this.tripPointListItemView.getElement());
    render(this.tripEditPointHeaderView, this.tripEditPointView.getElement());
    render(this.tripEditPointDetailsView, this.tripEditPointView.getElement());
    render(this.tripEditPointDetailsOffersView, this.tripEditPointDetailsView.getElement());
    render(this.tripEditPointDetailsDestinationView, this.tripEditPointDetailsView.getElement());

    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new TripPointListItemView(this.tripPoints[i]), this.tripPointListView.getElement());
    }
    render(this.tripPointListView, mainTripEventsElement);
  };
}
