const camalizeFirstCharacter = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  camalizeFirstCharacter,
  isEscapeKey
};

