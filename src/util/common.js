const ESCAPE_KEYS = ['Escape', 'Esc'];

const isEscapeKey = (evt) => ESCAPE_KEYS.includes(evt.key);

const camalizeFirstCharacter = (text) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

export {
  isEscapeKey,
  camalizeFirstCharacter,
};
