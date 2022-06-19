import AbstractView from '@/framework/view/abstract-view';
import { useChildrenView } from '@/framework/view/use-children-view';

import EditPointTypeIconView from './edit-point-type-icon-view';
import EditPointTypeListView from './edit-point-type-list-view';

const createViewTemplate = () => (
  `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
    </label>
    <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox"></input>
  </div>`
);

export default class EditPointTypeWrapperView extends useChildrenView(AbstractView) {
  constructor({ type, types }) {
    super();

    this._state = { type, types };

    this._addChild('typeIcon', { view: EditPointTypeIconView, selector: '.event__type-btn' });
    this._addChild('typeList', { view: EditPointTypeListView });

    this.#setInnterHandlers();
  }

  get template() {
    return createViewTemplate(this._state);
  }

  #setInnterHandlers = () => {
    this._children.typeList.setTypeChangeHandler(this.#handleTypeListChange);
  };

  #handleTypeListChange = (type) => {
    this._children.typeIcon.updateElement({ type });
  };
}
