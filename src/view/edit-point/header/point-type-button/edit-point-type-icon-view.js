import AbstractStatefulView from '@/framework/view/abstract-stateful-view';

const createViewTemplate = ({ type }) => (
  `<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">`
);

export default class EditPointTypeIconView extends AbstractStatefulView {
  constructor({ type }) {
    super();

    this._state = { type };
  }

  get template() {
    return createViewTemplate(this._state);
  }

  _restoreHandlers = () => {};
}
