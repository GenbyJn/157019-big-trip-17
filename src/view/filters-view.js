import AbstractView from '@framework/view/abstract-view';

import { FilterType } from '@/const';

const createFilterTemplate = (id, text, isChecked = false) => (
  `<div class="trip-filters__filter">
    <input 
      id="filter-${id}" 
      class="trip-filters__filter-input visually-hidden" 
      type="radio" 
      name="trip-filter" 
      value="${id}"
      ${isChecked ? 'checked': ''}
    >
    <label class="trip-filters__filter-label" for="filter-${id}">${text}</label>
  </div>`
);

const createViewTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    ${createFilterTemplate(FilterType.EVERYTHING, 'Everything', true)}
    ${createFilterTemplate(FilterType.PAST, 'Past')}
    ${createFilterTemplate(FilterType.FUTURE, 'Future')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

class TripFiltersView extends AbstractView {
  get template() {
    return createViewTemplate();
  }

  setFilter = (filterType) => {
    this.element.querySelector(`input[id=filter-${filterType}]`).checked = true;
  };

  setFilterChangeHandler = (callback) => {
    this._callback.change = callback;
    this.element.addEventListener('change', this.#changeHandler);
  };

  updateElement = (state) => {
    const element = this.element;

    Object.entries(state).forEach(([name, isEnabled]) => {
      element.querySelector(`input[id=filter-${name}`).disabled = ! isEnabled;
    });
  };

  #changeHandler = (evt) => {
    this._callback.change(evt.target.value);
  };
}

export default TripFiltersView;
