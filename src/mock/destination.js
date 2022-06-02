import { randomInteger } from '../mock/random';
import { POINT_DESTINATIONS } from '../const';

const generateDestinations = () =>  POINT_DESTINATIONS[randomInteger(0, POINT_DESTINATIONS.length - 1)];

const generateDestination = ({
  name = 'Chamonix',
} = {}) => ({
  description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
  name: generateDestinations(),
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${randomInteger(0,100)}`,
      description: 'Chamonix parliament building'
    }
  ]
});

export {
  generateDestinations,
  generateDestination,
};
