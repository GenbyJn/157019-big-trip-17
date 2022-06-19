import { render, RenderPosition } from '@/framework/render';

import PointListView from '@view/point-list-view';
import PointPresenter from './point-presenter';
import ListEmptyView from '@view/list-empty-view';
import SortView from '@/view/sort-view.js';
import { updateItem } from '@/util/util';
import { SortType } from '@/mock/const';
import { sortByTime, sortByPrice } from '../util/sort';

export default class PointListPresenter {
  #mainPointsElement = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  // #points = [];
  #pointPresenter = new Map();
  #sortComponent = new SortView();
  #currentSortType = SortType.DEFAULT;
  // #sourcedPoints = [];


  constructor(pointsModel) {
    this.#pointsModel = pointsModel;

  }
//console.log(his.#pointsModel);

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        [...this.#pointsModel.points].sort(sortByTime);
        break;
      case SortType.PRICE:
        [...this.#pointsModel.points].sort(sortByPrice);
        break;
    }
    return this.#pointsModel.points;
  }

  init (mainElement) {
    this.#mainPointsElement = mainElement;
    //this.#points = [...this.#pointsModel.points];

    //this.#sourcedPoints = [...this.#pointsModel.points];

    this.#renderItemList();
    this.#renderSort();
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderItemList = () => {
    if (this.points.length === 0 ) {
      render(new ListEmptyView(),  this.#mainPointsElement);
      return;
    }

    this.points.forEach((point)=> this.#renderPoint(point));

    render(this.#pointListComponent, this.#mainPointsElement);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainPointsElement, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  // #sortPoints = (sortType) => {
  //   switch (sortType) {
  //     case SortType.TIME:
  //       this.#points.sort(sortByTime);
  //       break;
  //     case SortType.PRICE:
  //       this.#points.sort(sortByPrice);
  //       break;
  //     default:
  //       this.#points = [...this.#sourcedPoints];
  //   }

  //   this.#currentSortType = sortType;
  // };

  #clearList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderItemList();
  };

  #handlePointChange = (updatePoint) => {
    this.points = updateItem(this.points, updatePoint);
    this.#pointPresenter.get(updatePoint.id).init(updatePoint);
  };

  #handleModeChange =() => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };
}
