import AbstractView from '@/framework/view/abstract-view';

const createViewTemplate = ({ type }) => (
  `<img 
    class="event__type-icon" 
    width="17" 
    height="17" 
    src="img/icons/${type}.png" 
    alt="Event type icon"
  >`
);

export default class EditPointTypeIconView extends AbstractView {
  constructor({ type }) {
    super();

    this._state = { type };
  }

  get template() {
    return createViewTemplate(this._state);
  }

  updateElement = ({ type }) => {
    this.element.src = `img/icons/${type}.png`;
  };
}
