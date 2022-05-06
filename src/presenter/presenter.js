
import { render, RenderPosition } from '../render.js';
import MainInfoView from '../view/main-info-view.js';
import MainFiltersView from '../view/main-filters-view.js';
import SortView from '../view/sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import EventTripView from '../view/event-trip-view.js';


export default class Presenter {
  mainInfoView = new MainInfoView();
  mainFiltersView = new MainFiltersView();
  sortView = new SortView();
  editPointView = new EditPointView();

  init = (containers) => {
    const {headerTripMainElement, headerTripMainFiltersElement, mainTripEventsElement, tripEventsListElement} = containers;
    render(this.mainInfoView, headerTripMainElement, RenderPosition.AFTERBEGIN);
    render(this.mainFiltersView, headerTripMainFiltersElement);
    render(this.sortView, mainTripEventsElement, RenderPosition.AFTERBEGIN);
    render(this.editPointView, tripEventsListElement);
    for (let i = 0; i < 3; i++) {
      render(new EventTripView(), tripEventsListElement);
    }
  };
}
