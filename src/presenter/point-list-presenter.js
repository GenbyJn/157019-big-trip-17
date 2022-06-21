import { render, remove, RenderPosition } from '@framework/render';

import UiBlocker from '@framework/ui-blocker/ui-blocker';
import PointService from '@service/point-service';

import PointListView from '@view/point-list-view';
import TripMessageView from '@view/trip-message-view';
import SortView from '@view/sort-view';

import PointNewPresenter from './point-new-presenter';

import { sortByDay, sortByTime, sortByPrice } from '@util/sort';
import {
  SortType,
  UpdateType,
  UserAction,
  TripMessage,
  UiBlockerTimeLimit as TimeLimit,
} from '@/const';

import PointPresenter from './point-presenter';

class PointListPresenter {
  #mainPointsElement = null;
  #pointsModel = null;
  #pointService = null;

  #pointNewPresenter = null;
  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #tripMessageComponent = null;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER, TimeLimit.UPPER);

  #pointPresenter = new Map();

  #isLoading = true;
  #currentSortType = SortType.DAY;

  constructor(mainElement, pointsModel, destinationsModel, offersModel) {
    this.#mainPointsElement = mainElement;
    this.#pointsModel = pointsModel;

    this.#pointService = new PointService(offersModel, destinationsModel);

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = [...this.#pointsModel.points];

    switch (this.#currentSortType) {
      case SortType.TIME:
        return points.sort(sortByTime);
      case SortType.PRICE:
        return points.sort(sortByPrice);
    }

    return points.sort(sortByDay);
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

    this.#resetViews();
    this.#currentSortType = SortType.DAY;
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
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    points.forEach(this.#renderPoint);

    render(this.#pointListComponent, this.#mainPointsElement);
  };

  #renderLoading = () => {
    this.#tripMessageComponent = new TripMessageView(TripMessage.LOADING);
    render(this.#tripMessageComponent,  this.#mainPointsElement, RenderPosition.AFTERBEGIN);
  };

  #renderNoPoints = () => {
    this.#tripMessageComponent = new TripMessageView(TripMessage.NO_POINTS);
    render(this.#tripMessageComponent, this.#mainPointsElement, RenderPosition.AFTERBEGIN);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainPointsElement, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #clearList = () => {
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
        this.#pointPresenter.get(update.id).setSaving();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#tripMessageComponent);
        this.#renderList();
        break;
    }
  };
}

export default PointListPresenter;
