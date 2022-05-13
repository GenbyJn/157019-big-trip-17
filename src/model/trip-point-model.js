import { generateTripPoint } from '../mock/point';

export default class TripPointModel {
  tripPoints = Array.from({length: 33}, generateTripPoint);

  getTripPonts = () => this.tripPoints;
}
