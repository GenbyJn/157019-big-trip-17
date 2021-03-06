import AbstractView from '@framework/view/abstract-view';

const createViewTemplate = () => (
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`
);

class RollupButtonView extends AbstractView {
  get template() {
    return createViewTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = () => {
    this._callback.click();
  };
}

export default RollupButtonView;
