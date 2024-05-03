import { EID, Film, GetFilmOptions } from './types';
import { FilmJson, ListJson } from './jsonTypes';

//
// UTILITIES
//

/**
 * Calls `fetch()` and resolves the Promise to a JSON object parsed from the payload.
 * @param url API endpoint URL.
 * @param options Optional `fetch()` request options.
 * @returns A JSON object (which could also be an array).
 */
const fetchJson = <T>(
  /** API endpoint URL. */
  url: string,
  /** Fetch options, if any. */
  options?: RequestInit
): Promise<T> =>
  fetch(url, options)
    // NOTE: error handling isn't anywhere near robust enough, but good enough for a POC
    //  where the API should "always work"
    .then(
      (res) => res.json(),
      (err) => {
        throw new Error(
          `Failed to get data from url="${url}": ${err instanceof Error ? err.message : err}`
        );
      }
    )
    .then(
      (json: T) => json,
      (err) => {
        throw new Error(
          `Failed to get JSON data out of response from url="${url}": ${
            err instanceof Error ? err.message : err
          }`
        );
      }
    );

/**
 * @private
 * Extracts an item's `EID` out of its URL reference.
 * @param url Item URL like `"https://swapi.dev/api/people/1/"`.
 * @returns Extracted ID or undefined if not found.
 */
const idExtractor = (url: string): EID => {
  const match = /\/(\d+)\/?$/.exec(url);
  if (!match) {
    throw new Error(`Failed to extract item ID from url="${url}"`);
  }
  return match[1];
};

/**
 * Converts a raw film object into a `Film`.
 * @param json Raw film JSON object.
 * @returns Converted `Film`.
 */
const jsonToFilm = (json: FilmJson): Film => ({
  id: idExtractor(json.url),
  title: json.title,
  episode_id: json.episode_id,
  opening_crawl: json.opening_crawl,
  director: json.director,
  producer: json.producer,
  release_date: new Date(json.release_date),
  created: new Date(json.created),
  edited: new Date(json.edited),

  // extract EIDs for each of these, keeping only valid (non-undefined) ones
  characters: json.characters.map(idExtractor),
  planets: json.planets.map(idExtractor),
  starships: json.starships.map(idExtractor),
  vehicles: json.vehicles.map(idExtractor),
  species: json.species.map(idExtractor),
});

//
// API FUNCTIONS
//

let baseUrl = 'http://localhost';

/**
 * Configures the base URL for the API endpoint.
 * @param url New base URL.
 */
export const setBaseUrl = (url: string) => {
  if (!URL.canParse(url)) {
    throw new Error(`Specified base URL is invalid (cannot parse): "${url}"`);
  }
  baseUrl = url;
};

/**
 * Gets a single Film.
 */
export const getFilm = async ({ id }: GetFilmOptions): Promise<Film> => {
  if (!id) {
    throw new Error(`Invalid id=${id}`);
  }
  const url = `${baseUrl}/api/films/${id}`;
  return fetchJson<FilmJson>(url).then(
    (json) => jsonToFilm(json),
    (err) => {
      throw new Error(
        `Failed to get Film by id="${id}" at url="${url}": ${
          err instanceof Error ? err.message : err
        }`
      );
    }
  );
};

/**
 * Get ALL Films.
 */
export const getFilms = (): Promise<Array<Film>> => {
  const url = `${baseUrl}/api/films`;
  return fetchJson<ListJson<FilmJson>>(url).then(
    (list) => list.results.map(jsonToFilm),
    (err) => {
      throw new Error(
        `Failed to get all Films at url="${url}": ${
          err instanceof Error ? err.message : err
        }`
      );
    }
  );
};
