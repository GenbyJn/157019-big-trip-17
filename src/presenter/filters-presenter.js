import { render } from '@framework/render';

import FiltersView from '@view/filters-view';
import { UpdateType } from '@/const.js';

class FiltersPresenter {
  #containerElement = null;
  #pointsModel = null;
  #filterModel = null;

  #filtersComponent = null;

  constructor(containerElement, pointsModel, filterModel) {
    this.#containerElement = containerElement;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    if (this.#filtersComponent === null) {
      this.#filtersComponent = new FiltersView();
      this.#filtersComponent.setFilterChangeHandler(this.#handleFilterChange);
    }

    render(this.#filtersComponent, this.#containerElement);
  };

  #handleModelEvent = () => {
    this.init();

    this.#filtersComponent.setFilter(this.#filterModel.filter);

    const points = this.#pointsModel.points;

    if (points.length === 0) {
      this.#filtersComponent.updateElement({
        everything: false,
        past: false,
        future: false,
      });

      return;
    }

    const dateNow = Date.now();

    this.#filtersComponent.updateElement({
      everything: true,
      past: points.some(({ dateFrom }) => dateFrom < dateNow),
      future: points.some(({ dateFrom }) => dateFrom > dateNow),
    });
  };

  #handleFilterChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}

export default FiltersPresenter;
