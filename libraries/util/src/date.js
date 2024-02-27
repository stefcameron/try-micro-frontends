import dayjs from 'dayjs/esm';

/**
 * Generates today's date as a pretty/formatted string.
 * @param {Object} [options]
 * @param {boolean} [short] If true, the date is returned in short `"YYYY/MM/DD"` format.
 *  Otherwise (default) it's returned in long `"dddd, MMMM DD, YYYY"` format.
 * @returns {string} Today's date as a formatted string.
 */
export const getToday = ({ short } = {}) => {
  const date = new Date();

  if (short) {
    return dayjs(date).format('YYYY/MM/DD');
  }

  return dayjs(date).format('dddd, MMMM DD, YYYY');
};
