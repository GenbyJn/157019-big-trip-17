import { render } from '../render';
import EventTripTemplate from '../view/event-trip-view.js';
import EventsListTemplate from './view/events-list-view.js';

export default class EventsPresrntor {
  EventsListConponent = new EventsListTemplate();
  EventTripConponent = new EventTripTemplate();

  init = (eventsContainer) => {
    this.eventsContainer = eventsContainer;

    render(this.EventTripConponent, this.EventsListConponent);
  };
}
