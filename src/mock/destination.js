import { randomInteger } from '../util';

const generateDestination = ({
  name = 'Chamonix',
} = {}) => ({
  description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
  name: 'Chamonix',
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${randomInteger(0,100)}`,
      description: 'Chamonix parliament building'
    }
  ]
});

const generateDestinations = () => [
  generateDestination({ name: 'Moon' }),
  generateDestination({ name: 'Mars' }),
];

export {
  generateDestinations,
  generateDestination,
};
