import { render } from '@/framework/render';

import FiltersView from '@filters/filters-view.js';
import FiltersEverythingView from '@filters/filters-everything-view.js';
import FiltersFutureView from '@filters/filters-future-view.js';
import FiltersPastView from '@filters/filters-past-view.js';

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
