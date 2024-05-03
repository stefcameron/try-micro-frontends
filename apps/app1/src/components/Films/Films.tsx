import { ChangeEvent, useState, useEffect } from 'react';
import { EID, Film, getFilms } from '@try-micro-frontends/api';
import { Checkbox } from '@try-micro-frontends/design';

import './Films.css';

export const Films = function (): JSX.Element {
  //
  // STATE
  //

  // TODO: move film selection into central Redux state so other pages/apps can access it
  const [selectedFilmIds, setSelectedFilmIds] = useState<Array<EID>>([]);

  const [films, setFilms] = useState<Array<Film>>([]);

  //
  // EVENTS
  //

  const handleFilmSelect = (
    filmId: EID,
    event: ChangeEvent,
    { newValue }: { newValue: boolean }
  ) => {
    const newSelection = selectedFilmIds.concat();
    if (newValue) {
      newSelection.push(filmId);
    } else {
      const idx = newSelection.indexOf(filmId);
      if (idx >= 0) {
        newSelection.splice(idx, 1);
      }
    }
    setSelectedFilmIds(newSelection);
  };

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
        console.error(
          `Failed to get films: ${(err as Error) instanceof Error ? (err as Error).message : (err as string)}`
        );
      }
    };
    void fetchFilms(); // no need to await this
  }, []);

  //
  // RENDER
  //

  return (
    <div className="films">
      {films.length > 0 ? (
        <ul className="films__listing">
          {films.map((f) => (
            <li key={f.id} className="films__listing__film">
              <Checkbox
                label={f.title}
                value={selectedFilmIds.includes(f.id)}
                onChange={(event: ChangeEvent, info: { newValue: boolean }) =>
                  handleFilmSelect(f.id, event, info)
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading films...</p>
      )}
    </div>
  );
};
