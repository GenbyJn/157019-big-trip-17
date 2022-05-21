import { generatePoint } from '../mock/point.js';

export default class PointModel {
  tripPoints = Array.from({length: 3}, generatePoint);

  getTripPonts = () => this.tripPoints;
}
