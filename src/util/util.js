const camalizeFirstCharacter = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const isEscapeKey = (evt) => evt.key === 'Escape';

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
}

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {
  camalizeFirstCharacter,
  isEscapeKey,
  updateItem
};

