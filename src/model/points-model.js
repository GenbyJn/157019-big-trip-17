import Observable from '@/framework/observable.js';
import { UpdateType } from '@/const.js';

import { generatePoints } from '@/mock/point.js';

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = generatePoints();

  constructor(pointsApiService) {
    super();

    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  init = async () => {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  };

  isEmpty = () => this.#points.length === 0;

  updatePoint = async (updateType, update) => {
    console.log('updatePoint')
    const index = this.#points.findIndex((point) => point.id === point.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch(err) {
      console.log(err)
      throw new Error('Can\'t update point');
    }
  };

  /*
{
  "base_price": 1100,
  "date_from": "2019-07-10T22:55:56.845Z",
  "date_to": "2019-07-11T11:22:13.375Z",
  "destination": $Destination$,
  "id": "0",
  "is_favorite": false,
  "offers": $Array<Offer.id>$,
  "ty
**/
  #adaptToClient = (point) => ({
    id: point['id'],
    type: point['type'],
    basePrice: point['base_price'],
    dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : null,
    dateTo: point['date_to'] !== null ? new Date(point['date_to']) : null,
    destination: point['destination'],
    isFavorite: point['is_favorite'],
    offers: point['offers'],
  });
}
