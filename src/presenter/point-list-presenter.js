import { render, RenderPosition } from '@/framework/render';

import PointListView from '@view/point-list-view';
import PointPresenter from './point-presenter';
import ListEmptyView from '@view/list-empty-view';
import SortView from '@/view/sort-view.js';
import { updateItem } from '@/util/util';
import { SortType } from '@/mock/const';
import { sortDateUp, sortDateDown } from '../util/date';

export default class PointListPresenter {
  #mainPointsElement = null;
  #pointModel = null;

  #pointListComponent = new PointListView();
  #points = [];
  #pointPresenter = new Map();
  #sortComponent = new SortView();
  #currentSortType = SortType.DEFAULT;
  #sourcedPoints = [];


  constructor(pointModel) {
    this.#pointModel = pointModel;

  }

  init (mainElement) {
    this.#mainPointsElement = mainElement;
    this.#points = [...this.#pointModel.points];

    this.#sourcedPoints = [...this.#pointModel.points];

    this.#renderItemList();
    this.#renderSort();
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderItemList = () => {
    if (this.#points.length === 0 ) {
      render(new ListEmptyView(),  this.#mainPointsElement);
      return;
    }

    this.#points.forEach((point)=> {
      this.#renderPoint(point);
    });

    render(this.#pointListComponent, this.#mainPointsElement);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainPointsElement, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DATE_UP:
        this.#points.sort(sortDateUp);
        break;
      case SortType.DATE_DOWN:
        this.#points.sort(sortDateDown);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  };

  #clearList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearList();
    this.#renderItemList();
  };

  #handlePointChange = (updatePoint) => {
    this.#points = updateItem(this.#points, updatePoint);
    this.#pointPresenter.get(updatePoint.id).init(updatePoint);
  };

  #handleModeChange =() => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };
}
