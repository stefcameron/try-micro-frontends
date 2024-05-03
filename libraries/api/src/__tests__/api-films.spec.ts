import fetchMock from 'jest-fetch-mock';
import { getFilm, getFilms } from '../api';
import { ListJson, FilmJson } from '../jsonTypes';

const mockData: ListJson<FilmJson> = {
  count: 3,
  results: [
    {
      title: 'A New Hope',
      episode_id: 4,
      opening_crawl:
        "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1977-05-25',
      characters: [
        'https://swapi.dev/api/people/1/',
        'https://swapi.dev/api/people/2/',
        'https://swapi.dev/api/people/3/',
        'https://swapi.dev/api/people/4/',
        'https://swapi.dev/api/people/5/',
        'https://swapi.dev/api/people/6/',
        'https://swapi.dev/api/people/7/',
        'https://swapi.dev/api/people/8/',
        'https://swapi.dev/api/people/9/',
        'https://swapi.dev/api/people/10/',
        'https://swapi.dev/api/people/12/',
        'https://swapi.dev/api/people/13/',
        'https://swapi.dev/api/people/14/',
        'https://swapi.dev/api/people/15/',
        'https://swapi.dev/api/people/16/',
        'https://swapi.dev/api/people/18/',
        'https://swapi.dev/api/people/19/',
        'https://swapi.dev/api/people/81/',
      ],
      planets: [
        'https://swapi.dev/api/planets/1/',
        'https://swapi.dev/api/planets/2/',
        'https://swapi.dev/api/planets/3/',
      ],
      starships: [
        'https://swapi.dev/api/starships/2/',
        'https://swapi.dev/api/starships/3/',
        'https://swapi.dev/api/starships/5/',
        'https://swapi.dev/api/starships/9/',
        'https://swapi.dev/api/starships/10/',
        'https://swapi.dev/api/starships/11/',
        'https://swapi.dev/api/starships/12/',
        'https://swapi.dev/api/starships/13/',
      ],
      vehicles: [
        'https://swapi.dev/api/vehicles/4/',
        'https://swapi.dev/api/vehicles/6/',
        'https://swapi.dev/api/vehicles/7/',
        'https://swapi.dev/api/vehicles/8/',
      ],
      species: [
        'https://swapi.dev/api/species/1/',
        'https://swapi.dev/api/species/2/',
        'https://swapi.dev/api/species/3/',
        'https://swapi.dev/api/species/4/',
        'https://swapi.dev/api/species/5/',
      ],
      created: '2014-12-10T14:23:31.880000Z',
      edited: '2014-12-20T19:49:45.256000Z',
      url: 'https://swapi.dev/api/films/1/',
    },
    {
      title: 'The Empire Strikes Back',
      episode_id: 5,
      opening_crawl:
        'It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....',
      director: 'Irvin Kershner',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1980-05-17',
      characters: [
        'https://swapi.dev/api/people/1/',
        'https://swapi.dev/api/people/2/',
        'https://swapi.dev/api/people/3/',
        'https://swapi.dev/api/people/4/',
        'https://swapi.dev/api/people/5/',
        'https://swapi.dev/api/people/10/',
        'https://swapi.dev/api/people/13/',
        'https://swapi.dev/api/people/14/',
        'https://swapi.dev/api/people/18/',
        'https://swapi.dev/api/people/20/',
        'https://swapi.dev/api/people/21/',
        'https://swapi.dev/api/people/22/',
        'https://swapi.dev/api/people/23/',
        'https://swapi.dev/api/people/24/',
        'https://swapi.dev/api/people/25/',
        'https://swapi.dev/api/people/26/',
      ],
      planets: [
        'https://swapi.dev/api/planets/4/',
        'https://swapi.dev/api/planets/5/',
        'https://swapi.dev/api/planets/6/',
        'https://swapi.dev/api/planets/27/',
      ],
      starships: [
        'https://swapi.dev/api/starships/3/',
        'https://swapi.dev/api/starships/10/',
        'https://swapi.dev/api/starships/11/',
        'https://swapi.dev/api/starships/12/',
        'https://swapi.dev/api/starships/15/',
        'https://swapi.dev/api/starships/17/',
        'https://swapi.dev/api/starships/21/',
        'https://swapi.dev/api/starships/22/',
        'https://swapi.dev/api/starships/23/',
      ],
      vehicles: [
        'https://swapi.dev/api/vehicles/8/',
        'https://swapi.dev/api/vehicles/14/',
        'https://swapi.dev/api/vehicles/16/',
        'https://swapi.dev/api/vehicles/18/',
        'https://swapi.dev/api/vehicles/19/',
        'https://swapi.dev/api/vehicles/20/',
      ],
      species: [
        'https://swapi.dev/api/species/1/',
        'https://swapi.dev/api/species/2/',
        'https://swapi.dev/api/species/3/',
        'https://swapi.dev/api/species/6/',
        'https://swapi.dev/api/species/7/',
      ],
      created: '2014-12-12T11:26:24.656000Z',
      edited: '2014-12-15T13:07:53.386000Z',
      url: 'https://swapi.dev/api/films/2/',
    },
    {
      title: 'Return of the Jedi',
      episode_id: 6,
      opening_crawl:
        'Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...',
      director: 'Richard Marquand',
      producer: 'Howard G. Kazanjian, George Lucas, Rick McCallum',
      release_date: '1983-05-25',
      characters: [
        'https://swapi.dev/api/people/1/',
        'https://swapi.dev/api/people/2/',
        'https://swapi.dev/api/people/3/',
        'https://swapi.dev/api/people/4/',
        'https://swapi.dev/api/people/5/',
        'https://swapi.dev/api/people/10/',
        'https://swapi.dev/api/people/13/',
        'https://swapi.dev/api/people/14/',
        'https://swapi.dev/api/people/16/',
        'https://swapi.dev/api/people/18/',
        'https://swapi.dev/api/people/20/',
        'https://swapi.dev/api/people/21/',
        'https://swapi.dev/api/people/22/',
        'https://swapi.dev/api/people/25/',
        'https://swapi.dev/api/people/27/',
        'https://swapi.dev/api/people/28/',
        'https://swapi.dev/api/people/29/',
        'https://swapi.dev/api/people/30/',
        'https://swapi.dev/api/people/31/',
        'https://swapi.dev/api/people/45/',
      ],
      planets: [
        'https://swapi.dev/api/planets/1/',
        'https://swapi.dev/api/planets/5/',
        'https://swapi.dev/api/planets/7/',
        'https://swapi.dev/api/planets/8/',
        'https://swapi.dev/api/planets/9/',
      ],
      starships: [
        'https://swapi.dev/api/starships/2/',
        'https://swapi.dev/api/starships/3/',
        'https://swapi.dev/api/starships/10/',
        'https://swapi.dev/api/starships/11/',
        'https://swapi.dev/api/starships/12/',
        'https://swapi.dev/api/starships/15/',
        'https://swapi.dev/api/starships/17/',
        'https://swapi.dev/api/starships/22/',
        'https://swapi.dev/api/starships/23/',
        'https://swapi.dev/api/starships/27/',
        'https://swapi.dev/api/starships/28/',
        'https://swapi.dev/api/starships/29/',
      ],
      vehicles: [
        'https://swapi.dev/api/vehicles/8/',
        'https://swapi.dev/api/vehicles/16/',
        'https://swapi.dev/api/vehicles/18/',
        'https://swapi.dev/api/vehicles/19/',
        'https://swapi.dev/api/vehicles/24/',
        'https://swapi.dev/api/vehicles/25/',
        'https://swapi.dev/api/vehicles/26/',
        'https://swapi.dev/api/vehicles/30/',
      ],
      species: [
        'https://swapi.dev/api/species/1/',
        'https://swapi.dev/api/species/2/',
        'https://swapi.dev/api/species/3/',
        'https://swapi.dev/api/species/5/',
        'https://swapi.dev/api/species/6/',
        'https://swapi.dev/api/species/8/',
        'https://swapi.dev/api/species/9/',
        'https://swapi.dev/api/species/10/',
        'https://swapi.dev/api/species/15/',
      ],
      created: '2014-12-18T10:39:33.255000Z',
      edited: '2014-12-20T09:48:37.462000Z',
      url: 'https://swapi.dev/api/films/3/',
    },
  ],
};

describe('/libraries/api.films', () => {
  beforeEach(() => {
    fetchMock.doMock();
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