import { render } from '../render';

const useChildrenView = (view) => class extends view {
  #childs = new Map();
  _children = {};

  getElement() {
    const element = super.getElement();

    for (const [name, { selector, position }] of this.#childs) {
      const container = selector ? element.querySelector(selector) : element;

      render(this._children[name], container, position);
    }

    return element;
  }

  removeElement() {
    for (const childView in this._children) {
      childView.removeElement();
    }

    super.removeElement();
  }

  addChild(name, options) {
    this.#childs.set(name, options);

    Object.defineProperty(this._children, name, {
      configurable: true,
      get: () => {
        const { view: ChildView } = this.#childs.get(name);

        const childView = new ChildView(this._state);

        delete this._children[name];
        this._children[name] = childView;

        return childView;
      }
    });
  }
};

export { useChildrenView };
