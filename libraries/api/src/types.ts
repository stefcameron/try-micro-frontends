/** Entity ID. */
export type EID = string;

export interface GetFilmOptions {
  /** ID of Film to get. */
  id: EID;
}

export interface Film {
  id: string;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  created: Date;
  edited: Date;

  /** List of related Character IDs. */
  characters: EID[];
  /** List of related Planet IDs. */
  planets: EID[];
  /** List of related Starship IDs. */
  starships: EID[];
  /** List of related Vehicle IDs. */
  vehicles: EID[];
  /** List of related Species IDs. */
  species: EID[];
}
