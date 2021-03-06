import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const setFlatpickr = (element, options = {}) =>
  flatpickr(element, {
    enableTime: true,
    dateFormat: 'd/m/y H:i',
    ...options,
  });

export {
  setFlatpickr,
};
