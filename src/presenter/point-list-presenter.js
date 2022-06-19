import { render, remove, RenderPosition } from '@/framework/render';

import PointListView from '@view/point-list-view';
import PointPresenter from './point-presenter';
import TripMessageView from '@view/trip-message-view';
import SortView from '@/view/sort-view.js';

import { SortType, UpdateType, UserAction } from '@/const.js';
import { sortByTime, sortByPrice } from '../util/sort';

const TripMessage = {
  LOADING: 'Loading...',
  NO_POINTS: 'Click New Event to create your first point',
};

export default class PointListPresenter {
  #mainPointsElement = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  #loadingComponent = null;

  #points = [];
  #sourcedPoints = [];

  #pointPresenter = new Map();
  #sortComponent = new SortView();

  #isLoading = true;
  #currentSortType = SortType.DEFAULT;

  constructor(mainElement, pointModel) {
    this.#mainPointsElement = mainElement;
    this.#pointsModel = pointModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortByTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortByPrice);
    }
    return this.#pointsModel.points;
  }

  init = () => {
    // this.#points = [...this.#pointModel.points];
    // this.#sourcedPoints = [...this.#pointModel.points];

    this.#renderList();
    // this.#renderSort();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderLoading = () => {
    this.#loadingComponent = new TripMessageView(TripMessage.LOADING);
    render(this.#loadingComponent,  this.#mainPointsElement);
  };

  #renderList = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#pointsModel.isEmpty()) {
      render(new TripMessageView(TripMessage.NO_POINTS),  this.#mainPointsElement);
      return;
    }

    this.#points = [...this.#pointsModel.points];
    this.#sourcedPoints = [...this.#pointsModel.points];
    this.#points.forEach(this.#renderPoint);

    render(this.#pointListComponent, this.#mainPointsElement);
    this.#renderSort();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainPointsElement, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
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
    this.#renderList();
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        // this.#taskPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          // this.#taskPresenter.get(update.id).setAborting();
        }
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // this.#clearBoard();
        // this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderList();
        break;
    }
  };
}
