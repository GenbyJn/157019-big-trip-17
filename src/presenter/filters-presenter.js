import { render } from '@framework/render';

import FiltersView from '@view/filters/filters-view';
import FiltersEverythingView from '@view/filters/filters-everything-view';
import FiltersFutureView from '@view/filters/filters-future-view';
import FiltersPastView from '@view/filters/filters-past-view';

class FiltersPresenter {
  #filtersView = new FiltersView();
  #filtersEverythingView = new FiltersEverythingView();
  #filtersFutureView = new FiltersFutureView();
  #filtersPastView = new FiltersPastView();

  init = (containerElement) => {
    render(this.#filtersView, containerElement);
    render(this.#filtersEverythingView, this.#filtersView.element);
    render(this.#filtersFutureView, this.#filtersView.element);
    render(this.#filtersPastView, this.#filtersView.element);
  };
}

export default FiltersPresenter;
