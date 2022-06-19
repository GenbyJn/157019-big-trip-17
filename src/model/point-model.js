import { generatePoints } from '@/mock/point.js';
import Observable from '../framework/observable';

export default class PointsModel extends Observable {

  #points = generatePoints();

  get points() {
    return this.#points;
  }
}
