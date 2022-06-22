const createDestination = ({
  name = 'Chamonix',
  description = 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
  pictures = [
    {
      src: 'http://picsum.photos/300/200?r=0.0762563005163317',
      description: 'Chamonix parliament building',
    }
  ],
} = {}) => ({
  description,
  name,
  pictures,
});

const createDestinations = () => [
  createDestination({ name: 'Moscow', description: 'description for Moscow' }),
  createDestination({ name: 'Moon', description: 'description for Moon' }),
  createDestination({ name: 'Mars', description: '', pictures: [] }),
];

export {
  createDestination,
  createDestinations,
};
