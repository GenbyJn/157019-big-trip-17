import { render } from '@/framework/render';

import FiltersView from '@filters/filters-view.js';
import FiltersEverythingView from '@filters/filters-everything-view.js';
import FiltersFutureView from '@filters/filters-future-view.js';
import FiltersPastView from '@filters/filters-past-view.js';

export default class FiltersPresenter {
  #filtersComponent = new FiltersView();
  #filtersEverythingComponent = new FiltersEverythingView();
  #filtersFutureComponent = new FiltersFutureView();
  #filtersPastComponent = new FiltersPastView();

  init = (container) => {
    const {headerMainFiltersElement} = container;

    render(this.#filtersComponent, headerMainFiltersElement);
    render(this.#filtersEverythingComponent, this.#filtersComponent.element);
    render(this.#filtersFutureComponent, this.#filtersComponent.element);
    render(this.#filtersPastComponent, this.#filtersComponent.element);
  };
}
