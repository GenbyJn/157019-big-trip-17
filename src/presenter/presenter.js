
import { render, RenderPosition } from '../render.js';
import MainInfoView from '../view/main-info-view.js';
import MainFiltersView from '../view/main-filters-view.js';
import SortItemsView from '../view/sort-view.js';

import EditorPointView from '../view/edit-point-view.js';

export default class Presentor {
  init = (containers) => {
    const {headerTripMain, headerTripMainFilters, mainTripEvents, tripEventsList} = containers;
    render(new MainInfoView(), headerTripMain, RenderPosition.AFTERBEGIN);
    render(new MainFiltersView(), headerTripMainFilters);
    render(new SortItemsView(), mainTripEvents);
    render(new EditorPointView(), tripEventsList);
  };
}
