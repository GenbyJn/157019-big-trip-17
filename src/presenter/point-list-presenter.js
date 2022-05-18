import { render, RenderPosition } from '@/render';

import PointListView from '@view/point-list-view.js';
import PointListItemView from '@view/point-list-item-view';
import EditPointView from '@view/edit-point/edit-point-view';

export default class PointListPresenter{
  pointListView = new PointListView();
  pointListItemView = new PointListItemView();
  editPointView = new EditPointView();

  init = (container) => {
    const {mainTripEventsElement, tripPointModel} = container;

    this.tripPointModel = tripPointModel;
    this.tripPoints = [...this.tripPointModel.getTripPonts()];

    render(this.editPointView, this.pointListView.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new PointListItemView(this.tripPoints[i]), this.pointListView.getElement());
    }
    render(this.pointListView, mainTripEventsElement);
  };
}
