import fetchMock from 'jest-fetch-mock';
import { getFilm, getFilms } from '../api';
import { mkMockData } from './fixtures';

describe('/libraries/api.films', () => {
  let mockData: ReturnType<typeof mkMockData>;

  beforeEach(() => {
    fetchMock.doMock();

    mockData = mkMockData();
  });

  describe('#getFilm', () => {
    it('gets a single Film', async () => {
      const ep4 = mockData.results.find((f) => f.episode_id === 4)!;
      fetchMock.once(JSON.stringify(ep4));
      const film = await getFilm({ id: 'foo' });
      expect(film.title).toBe(ep4.title);
    });
  });

  describe('#getFilms', () => {
    it('gets all Films', async () => {
      fetchMock.once(JSON.stringify(mockData));
      const films = await getFilms();
      expect(films.length).toBe(mockData.count);
      expect(films[0].title).toBe(mockData.results[0].title);
    });
  });
});
