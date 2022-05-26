import { render } from '../render.js';

import FiltersView from '../view/filters/filters-view.js';
import FiltersEverythingView from '../view/filters/filters-everything-view.js';
import FiltersFutureView from '../view/filters/filters-future-view.js';
import FiltersPastView from '../view/filters/filters-past-view.js';

export default class FiltersPresenter {
  #filtersView = new FiltersView();
  #filtersEverythingView = new FiltersEverythingView();
  #filtersFutureView = new FiltersFutureView();
  #filtersPastView = new FiltersPastView();

  init = (container) => {
    const {headerMainFiltersElement} = container;

    render(this.#filtersView, headerMainFiltersElement);
    render(this.#filtersEverythingView, this.#filtersView.element);
    render(this.#filtersFutureView, this.#filtersView.element);
    render(this.#filtersPastView, this.#filtersView.element);
  };
}
