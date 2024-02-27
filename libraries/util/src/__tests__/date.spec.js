import { getToday } from '../date';

describe('/libraries/util/date', () => {
  describe('#getToday', () => {
    it('generates a long date by default', () => {
      expect(getToday()).toMatch(/^[a-zA-Z]+, [a-zA-Z]+ \d{2}, \d{4}$/);
    });

    it('has a short date option', () => {
      expect(getToday({ short: true })).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
    });
  });
});
