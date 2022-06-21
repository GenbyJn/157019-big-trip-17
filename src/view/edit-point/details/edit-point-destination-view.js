import AbstractStatefulView from '@framework/view/abstract-stateful-view';

const createPhotoTemplate = ({ src, description }) => (
  `<img class="event__photo" src="${src}" alt="${description}">`
);

const createPhotosTemplate = (pictures) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map(createPhotoTemplate).join('')}
    </div>
  </div>`
);

const createViewTemplate = ({ description, pictures, hasDestination = false }) => (
  `<section class="event__section event__section--destination ${hasDestination ? '' : 'visually-hidden'}">
    <h3 class="event__section-title event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${createPhotosTemplate(pictures)}
  </section>`
);

export default class EditPointDestinationView extends AbstractStatefulView {
  constructor({ destination, hasDestination }) {
    super();

    this._state = { ...destination, hasDestination };
  }

  get template() {
    return createViewTemplate(this._state);
  }

  _restoreHandlers = () => { };
}
