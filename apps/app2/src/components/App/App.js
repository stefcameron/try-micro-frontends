import { useState, useEffect } from 'react';
import { getFilms } from '@try-micro-frontends/api';
import { TextInput } from '@try-micro-frontends/design';

import './App.css';

export const App = function () {
  //
  // STATE
  //

  const [titleFilter, setTitleFilter] = useState('');
  const [films, setFilms] = useState([]); // {Array<import('@try-micro-frontends/api').Film>}

  //
  // EFFECTS
  //

  // get all films on first load
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const allFilms = await getFilms();
        setFilms(allFilms);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`Failed to get films: ${err?.message || err}`);
      }
    };
    fetchFilms();
  }, []);

  //
  // RENDER
  //

  const lowerTitleFilter = titleFilter.toLowerCase();
  const filteredFilms = titleFilter
    ? films.filter((f) => f.title.toLowerCase().includes(lowerTitleFilter))
    : films;

  return (
    <div className="app">
      <header>
        <h1>App2 - Star Wars Films</h1>
        <nav>
          <TextInput
            label="Filter by title"
            value={titleFilter}
            onChange={(event, { newValue }) => setTitleFilter(newValue)}
          />
        </nav>
      </header>
      <section>
        {films.length > 0 ? (
          filteredFilms.map((f) => <p key={f.id}>{f.title}</p>)
        ) : (
          <p>Loading films...</p>
        )}
      </section>
      <footer>
        <p>
          Data from{' '}
          <a href="https://swapi.dev/" target="_blank" rel="noreferrer">
            SWAPI.dev
          </a>
        </p>
      </footer>
    </div>
  );
};
