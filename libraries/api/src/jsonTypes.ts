//
// Raw JSON payloads coming directly from SWAPI
//

/**
 * Film raw data payload.
 */
export interface FilmJson {
  /** Self-URL */
  url: string;

  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;

  /** YYYY-MM-DD format */
  release_date: string;
  /** ISO8601 timestamp */
  created: string;
  /** ISO8601 timestamp */
  edited: string;

  /** List of related Character URLs like "https://swapi.dev/api/people/1/". */
  characters: string[];
  /** List of related Planet URLs like "https://swapi.dev/api/planets/1/". */
  planets: string[];
  /** List of related Starship URLs. */
  starships: string[];
  /** List of related Vehicle URLs. */
  vehicles: string[];
  /** List of related Species URLs. */
  species: string[];
}

/** List of JSON items. */
export interface ListJson<T> {
  /** Number of items in the list. */
  count: number;
  /** List of items. */
  results: Array<T>;
}
