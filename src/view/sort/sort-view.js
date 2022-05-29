import AbstractView from '@view/abstract-view';

const createSortTemplate = () => '<form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>';

export default class SortView extends AbstractView{
  #element = null;

  get template() {
    return createSortTemplate();
  }
}
