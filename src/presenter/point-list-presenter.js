import { render, RenderPosition } from '@/render';

import PointListView from '@view/point-list-view.js';
import PointListItemView from '@view/point-list-item-view.js';
import EditPointView from '@view/edit-point/edit-point-view.js';

export default class PointListPresenter{
  pointListView = new PointListView();
  pointListItemView = new PointListItemView();
  editPointView = null;

  init = (container) => {
    const {mainTripEventsElement, tripPointModel} = container;

    this.tripPointModel = tripPointModel;
    this.points = [...this.tripPointModel.getPoints()];

    this.editPointView = new EditPointView(this.points[0]);

    render(this.editPointView, this.pointListView.getElement(), RenderPosition.AFTERBEGIN);

    this.points.forEach((point) => {
      render(new PointListItemView(point), this.pointListView.getElement());
    });

    render(this.pointListView, mainTripEventsElement);
  };
}
