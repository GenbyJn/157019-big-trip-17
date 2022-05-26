import { createElement } from '@/render';

const createRollupButtonTemplate = () => (
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`
);

export default class RollupButtonView {
  #element = null;

  get template() {
    return createRollupButtonTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
