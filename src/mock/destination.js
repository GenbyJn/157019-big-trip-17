import { randomInteger } from '../util';

export const generateDestination = () => ({
  description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
  name: 'Chamonix',
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${randomInteger(0,100)}`,
      description: 'Chamonix parliament building'
    }
  ]
});
