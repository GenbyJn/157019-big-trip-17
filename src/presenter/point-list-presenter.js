import { render, remove, RenderPosition } from '@framework/render';

import UiBlocker from '@framework/ui-blocker/ui-blocker';

import PointListView from '@view/point-list-view';
import TripMessageView from '@view/trip-message-view';
import SortView from '@view/sort-view';

import PointNewPresenter from './point-new-presenter';

import { sortByDay, sortByTime, sortByPrice } from '@util/sort';
import { filterPoints } from '@util/filter';
import {
  SortType,
  FilterType,
  UpdateType,
  UserAction,
  TripMessage,
  UiBlockerTimeLimit as TimeLimit,
} from '@/const';

import PointPresenter from './point-presenter';

const filterTypeToMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

class PointListPresenter {
  #containerElement = null;
  #pointsModel = null;
  #pointService = null;
  #filterModel = null;

  #pointNewPresenter = null;
  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #tripMessageComponent = null;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER, TimeLimit.UPPER);

  #pointPresenter = new Map();

  #isLoading = true;
  #currentSortType = SortType.DAY;

  constructor(containerElement, pointsModel, filterModel, pointService) {
    this.#containerElement = containerElement;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointService = pointService;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filteredPoints = filterPoints(
      this.#pointsModel.points,
      this.#filterModel.filter,
    );

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints.sort(sortByDay);
  }

  init = () => {
    this.#renderList();
  };

  createPoint = (callback) => {
    if (this.#pointNewPresenter === null) {
      this.#pointNewPresenter = new PointNewPresenter(
        this.#pointListComponent.element,
        this.#handleViewAction,
        this.#pointService,
      );
    }

    this.#currentSortType = SortType.DAY;
    this.#sortComponent.setSort(SortType.DAY);
    this.#filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(
      this.#pointListComponent.element,
      this.#handleViewAction,
      this.#pointService,
    );

    pointPresenter.init(point);

    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderList = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    if (points.length === 0) {
      remove(this.#sortComponent);
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    points.forEach(this.#renderPoint);

    render(this.#pointListComponent, this.#containerElement);
  };

  #renderLoading = () => {
    this.#tripMessageComponent = new TripMessageView(TripMessage.LOADING);
    render(this.#tripMessageComponent,  this.#containerElement, RenderPosition.AFTERBEGIN);
  };

  #renderNoPoints = () => {
    const message = filterTypeToMessage[this.#filterModel.filter];

    this.#tripMessageComponent = new TripMessageView(message);
    render(this.#tripMessageComponent, this.#containerElement, RenderPosition.AFTERBEGIN);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#containerElement, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #clearList = ({ resetSortType = false } = {}) => {
    if (this.#tripMessageComponent !== null) { // if (this.#tripMessageComponent) {...}
      remove(this.#tripMessageComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
      this.#sortComponent.setSort(SortType.DAY);
    }

    this.#pointNewPresenter?.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #resetViews = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderList();
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.CHANGE_VIEW:
        this.#pointNewPresenter?.destroy();
        this.#resetViews();
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearList({ resetSortType: true });
        this.#renderList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#tripMessageComponent);
        this.#renderList();
        break;
    }
  };
}

export default PointListPresenter;
