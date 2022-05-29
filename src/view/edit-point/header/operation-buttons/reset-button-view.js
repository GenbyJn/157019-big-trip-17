import AbstractView from '@view/abstract-view';

const createResetButtonTemplate = ({ text }) => (
  `<button class="event__reset-btn" type="reset">${text}</button>`
);

export default class ResetButtonView extends AbstractView {
  #element = null;
  _state = {};

  constructor({ resetButtonText: text }) {
    super();
    this._state = { text };
  }

  get template() {
    return createResetButtonTemplate(this._state);
  }
}
