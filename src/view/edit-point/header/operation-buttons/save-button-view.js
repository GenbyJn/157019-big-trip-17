import AbstractStatefulView from '@/framework/view/abstract-stateful-view';

const createViewTemplate = ({ isDisabled, isSaving }) => (
  `<button 
    class="event__save-btn btn btn--blue" 
    type="submit" 
    ${isDisabled ? 'disabled' : ''}
    >${isSaving ? 'Saving...' : 'Save'}</button>`
);

class SaveButtonView extends AbstractStatefulView {
  constructor({ isSaving, isDisabled }) {
    super();

    this._state = { isSaving, isDisabled };
  }

  get template() {
    return createViewTemplate(this._state);
  }

  _restoreHandlers = () => {};
}

export default SaveButtonView;
