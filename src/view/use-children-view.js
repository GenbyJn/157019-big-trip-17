import { render } from '../render';

const useChildrenView = (view) => class extends view {
  #childs = new Map();
  _children = {};

  getElement() {
    const element = super.getElement();

    for (const [name, options] of this.#childs) {
      const { enumerable: shouldRender } = Object.getOwnPropertyDescriptor(this._children, name);

      if (shouldRender) {
        this.#renderChild(name, element, options);
      }
    }

    return element;
  }

  removeElement() {
    const children = Object.getOwnPropertyDescriptors(this._children);

    for (const name in children) {
      const { value: childView } = children[name];

      if (childView) {
        childView.removeElement();
        this.#prepareChild(name);
      }
    }

    super.removeElement();
  }

  addChild(name, options) {
    this.#childs.set(name, options);
    this.#prepareChild(name);
  }

  setChildRender(name, shouldRender = true) {
    Object.defineProperty(this._children, name, { enumerable: shouldRender });
  }

  #prepareChild(name) {
    Object.defineProperty(this._children, name, {
      configurable: true,
      enumerable: true,
      get: () => {
        const { view: ChildView } = this.#childs.get(name);

        const childView = new ChildView(this._state);

        delete this._children[name];
        this._children[name] = childView;

        return childView;
      }
    });
  }

  #renderChild(name, container, { selector, position }) {
    if (selector) {
      container = container.querySelector(selector);
    }

    render(this._children[name], container, position);
    Object.defineProperty(this._children, name, { enumerable: false });
  }
};

export { useChildrenView };
