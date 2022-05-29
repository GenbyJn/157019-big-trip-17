import AbstractView from '@view/abstract-view';

const createInfoCostTemplate = () => (
  `<p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>`
);

export default class InfoCostView extends AbstractView {
  #element = null;

  get template() {
    return createInfoCostTemplate();
  }
}
