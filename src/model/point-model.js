import { generateTripPoint } from '../mock/point';

export default class TripPointModel {
  tripPoints = Array.from({length: 3}, generateTripPoint);

  getTripPonts = () => this.tripPoints;
}
