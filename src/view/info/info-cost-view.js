import AbstractView from '@/framework/view/abstract-view';

const createInfoCostTemplate = () => (
  `<p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>`
);

export default class InfoCostView extends AbstractView {

  get template() {
    return createInfoCostTemplate();
  }
}
